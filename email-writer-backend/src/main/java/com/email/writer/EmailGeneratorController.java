//package com.email.writer;
//
//
//import lombok.AllArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/email")
//@AllArgsConstructor
//@CrossOrigin(origins = "*")
//public class EmailGeneratorController {
//
//    private final EmailGeneratorService emailGeneratorService;
//
//    @PostMapping("/generate")
//    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
//        String response = emailGeneratorService.generateEmailReply(emailRequest);
//        return ResponseEntity.ok(response);
//    }
//}

package com.email.writer;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(
        origins = "*",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS}
)
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }

    // Required for Chrome extension preflight
    @GetMapping("/generate")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}

