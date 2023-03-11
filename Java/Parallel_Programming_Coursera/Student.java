import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;


public class Student {
    private int id;
    private boolean isCurrent;
    private int age;

    public Student(int id, boolean isCurrent, int age) {
        this.id = id;
        this.isCurrent = isCurrent;
        this.age = age;
    }

    //normal way to do it without stream
    public static double seqStudentAvg(Student[] studentArray){
        List<Student> activeStudentArr = new ArrayList<Student>();
        for(Student s : studentArray){
            if(s.isCurrent)activeStudentArr.add(s);
        }

        long ageSum = 0;
        for(Student s: activeStudentArr){
            ageSum += s.age;
        }

        return (double)ageSum/activeStudentArr.size();
    }

    public static double seqStudentAvgWithStream(Student[] studentArray){
        double avg = Stream.of(studentArray)
                    .filter(s -> s.isCurrent)
                    .mapToDouble(a -> a.age)
                    .average()
                    .getAsDouble();

        return avg;
    }

    public static double parStudentAvgWithStream(Student[] studentArray){
        double avg = Stream.of(studentArray)
                .parallel()
                .filter(s -> s.isCurrent)
                .mapToDouble(a -> a.age)
                .average()
                .getAsDouble();

        return avg;
    }

    public static void main(String[] args){
        int size = 100000;
        Student[] studentArray = new Student[size];
        for(int i = 0; i < size; i++){
            studentArray[i] = new Student(i, true, 10);
        }

        long startTime, endTime, totalTime;

        System.out.println("-----------------------------------");
        //sequential sum
        startTime = System.nanoTime();
        System.out.println("Average student sum with size:" + size + "= " + Student.seqStudentAvg(studentArray));
        endTime = System.nanoTime();
        totalTime = (endTime - startTime);
        System.out.println("Sequential Average without stream time: " + totalTime + " (nanoseconds) " + Math.round(totalTime/1000000) + " (milliseconds)");

        System.out.println("----------------------------------- ");
        //sequential sum
        startTime = System.nanoTime();
        System.out.println("Average student sum with size:" + size + "= " + Student.seqStudentAvgWithStream(studentArray));
        endTime = System.nanoTime();
        totalTime = (endTime - startTime);
        System.out.println("Sequential Average WITH stream time: " + totalTime + " (nanoseconds) " + Math.round(totalTime/1000000) + " (milliseconds)");

        System.out.println("-----------------------------------");
        //sequential sum
        startTime = System.nanoTime();
        System.out.println("Average student sum with size:" + size + "= " + Student.parStudentAvgWithStream(studentArray));
        endTime = System.nanoTime();
        totalTime = (endTime - startTime);
        System.out.println("Parallel Average WITH stream time: " + totalTime + " (nanoseconds) " + Math.round(totalTime/1000000) + " (milliseconds)");
    }
}
