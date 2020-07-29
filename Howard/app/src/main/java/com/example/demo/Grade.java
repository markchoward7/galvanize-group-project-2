package com.example.demo;

public enum Grade {
    E1(1L), E2(2L), E3(4L), E4(8L), E5(16L), E6(32L), E7(64L), E8(128L), E9(256L),
    O1(512L), O2(1024L), O3(2048L), O4(4096L), O5(8192L), O6(16384L), O7(32768L), O8(65536L), O9(131072L), O10(262144L);

    private Long value;

    Grade(Long value) {
        this.value = value;
    }

    public Long getValue() {
        return value;
    }

    boolean matches(Long value) {
        return (this.value & value) >= 1;
    }

    static Long combine(Iterable<Grade> values) {
        Long accumulator = 0L;
        for (Grade grade : values) {
            accumulator = accumulator | grade.getValue();
        }
        return accumulator;
    }
}
