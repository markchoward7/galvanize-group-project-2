package com.example.demo;

import java.util.LinkedList;
import java.util.List;

public enum RequirementCode {
    A(1L), B(2L), C(4L), D(8L), E(16L);

    private Long value;

    RequirementCode(Long value) {
        this.value = value;
    }

    Long getValue() {
        return value;
    }

    boolean matches(Long value) {
        return (this.value & value) >= 1;
    }


    static RequirementCode fromValue(Long value) {
        for (RequirementCode code : RequirementCode.values()) {
            if (code.matches(value)) {
                return code;
            }
        }
        return null;
    }

    static Long combine(Iterable<RequirementCode> values) {
        Long accumulator = 0L;
        for (RequirementCode code : values) {
            accumulator = accumulator | code.getValue();
        }
        return accumulator;
    }

    static List<RequirementCode> buildList(Long value) {
        List<RequirementCode> codeList = new LinkedList<>();
        for (RequirementCode code : RequirementCode.values()) {
            if (code.matches(value)) {
                codeList.add(code);
            }
        }
        return codeList;
    }
}
