import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

//This uses recursiveTask
public class ArraySumWithRecursiveTask {

    public static long seqArrSum(int[] arr) {
        long ans = 0;
        for (int i = 0; i < arr.length; i++) {
            ans += arr[i];
        }
        return ans;

    }

    public static long parArrSum(int[] arr, int parallelism) {
        ForkJoinPool pool = new ForkJoinPool(parallelism);
        ArraySumTask task = new ArraySumTask(0, arr.length, arr);
        long ans = pool.invoke(task);
        return ans;
    }

    //we need ArraySumTask to be static because we only need 1 instance of this class
    private static class ArraySumTask extends RecursiveTask<Long> {
        private final int threshold = 1_000_000;
        private int startingIndexIncluded;
        private int endIndexExcluded;
        private long value;
        private int[] data;

        public ArraySumTask(int startingIndexIncluded, int endIndexExcluded, int[] data) {
            this.startingIndexIncluded = startingIndexIncluded;
            this.endIndexExcluded = endIndexExcluded;
            this.data = data;
        }
        
        //@override
        protected Long compute() {
            if(endIndexExcluded - startingIndexIncluded <= threshold){
                for (int i = startingIndexIncluded; i < endIndexExcluded; i++) {
                    value += data[i];
                }
                return value;
            }
            else{
                ArraySumTask left = new ArraySumTask(startingIndexIncluded, (startingIndexIncluded + endIndexExcluded)/2, data);
                ArraySumTask right = new ArraySumTask((startingIndexIncluded + endIndexExcluded)/2, endIndexExcluded, data);
                /*
                left.fork();
                return left.join() + right.compute();
                */

                
                left.fork();
                right.fork();
                return left.join() + right.join();
                
            }
        }
    }
}
