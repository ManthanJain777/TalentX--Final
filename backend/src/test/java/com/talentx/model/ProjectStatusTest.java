package com.talentx.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProjectStatusTest {

    @Test
    void allowsOnlyValidLifecycleTransitions() {
        assertTrue(ProjectStatus.DRAFT.canTransitionTo(ProjectStatus.ACTIVE));
        assertFalse(ProjectStatus.DRAFT.canTransitionTo(ProjectStatus.COMPLETED));
        assertTrue(ProjectStatus.ACTIVE.canTransitionTo(ProjectStatus.PAUSED));
        assertTrue(ProjectStatus.ACTIVE.canTransitionTo(ProjectStatus.DISPUTED));
        assertTrue(ProjectStatus.ACTIVE.canTransitionTo(ProjectStatus.COMPLETED));
        assertTrue(ProjectStatus.PAUSED.canTransitionTo(ProjectStatus.ACTIVE));
        assertTrue(ProjectStatus.DISPUTED.canTransitionTo(ProjectStatus.ACTIVE));
        assertFalse(ProjectStatus.COMPLETED.canTransitionTo(ProjectStatus.ACTIVE));
    }

    @Test
    void rejectsInvalidStatusInput() {
        assertThrows(IllegalArgumentException.class, () -> ProjectStatus.parse("NOT_A_STATUS"));
        assertThrows(IllegalArgumentException.class, () -> ProjectStatus.parse(""));
        assertEquals(ProjectStatus.ACTIVE, ProjectStatus.parse(" active "));
    }
}
