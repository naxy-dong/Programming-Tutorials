public class ParallelProgrammingRunner{
    public static final int size = 1_000_000_000, parallelism = 6;

    public static void main(String[] args){
        System.out.println("Array size: 1_000_000_000, Parellelism 2:, best threshold: 5_000_000");
        System.out.println("Array size: 1_000_000_000, Parellelism 6:, best threshold: 500_000");
        System.out.println("\nSettings: ");
        System.out.println("================================================" );
        
        System.out.println("Array size: "+ size + "\nparallelism: "+ parallelism);

        int[] data = new int[size];
        for(int i = 0; i < data.length; i++){
            data[i] = i+1;
        }
        long startTime, endTime, totalTime;

        //System.out.println(Long.MAX_VALUE);
        //System.out.println("Max Integer Size: "+Integer.MAX_VALUE);

        System.out.println("-----------------------------------");
        //sequential sum
        startTime = System.nanoTime();
        System.out.println("Sum from 1 to " + size + ": " + ArraySumWithRecursiveAction.seqArrSum(data));
        endTime = System.nanoTime();
        totalTime = (endTime - startTime);
        System.out.println("Sequential Sum Time: " + totalTime + " (nanoseconds) " + Math.round(totalTime/1000000) + " (milliseconds)");

        System.out.println("-----------------------------------");
        //parallel sum
        startTime = System.nanoTime();
        System.out.println("Sum from 1 to " + size + ": " + ArraySumWithRecursiveAction.parArrSum(data, parallelism));
        endTime = System.nanoTime();
        totalTime = (endTime - startTime);
        System.out.println("Parallel Sum(w. Action) Time: " + totalTime + " (nanoseconds) " + Math.round(totalTime/1000000) + " (milliseconds)");

        System.out.println("-----------------------------------");
        //parallel sum (w. Task)
        startTime = System.nanoTime();
        System.out.println("Sum from 1 to " + size + ": " + ArraySumWithRecursiveTask.parArrSum(data, parallelism));
        endTime = System.nanoTime();
        totalTime = (endTime - startTime);
        System.out.println("Parallel Sum(w. Task) Time: " + totalTime + " (nanoseconds) " + Math.round(totalTime/1000000) + " (milliseconds)");
    }

    public static long testFormula(long n){
        return (n*(n+1))/2;
    }
}