package com.stasa.services;

import com.stasa.entities.User;
import com.stasa.entities.VerificationCode;
import com.stasa.repositories.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class VerificationCodeService {

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;
    @Autowired
    private UserService userService;

    public ResponseEntity<Boolean> generateVerificationCode() {
        User user = userService.whoAmI();

        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        if(user.isVerified()) {
            // Don't generate verification code if user is already verified.
            return ResponseEntity.badRequest().body(false);
        } else {



            String generatedCode = String.valueOf(new Random().nextInt(899999) + 100000);
            var code = new VerificationCode(generatedCode, userService.whoAmI());
            try {
                verificationCodeRepository.save(code);
                return ResponseEntity.ok(true);
            } catch (IllegalArgumentException e) {
                System.err.println("Could not save generated verification code!");
                e.printStackTrace();
                return ResponseEntity.internalServerError().body(false);
            }
        }
    }

}
