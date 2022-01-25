package com.stasa;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ServerTest {

    @Test
    public void testJunit() {
        String name1 = "Sebbe";
        assertNotNull(name1);
        assertEquals(name1, "Sebbe");
    }
}
