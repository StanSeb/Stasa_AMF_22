package com.stasa.services;

import com.stasa.configurations.MyUserDetailsService;
import com.stasa.entities.User;
import com.stasa.repositories.UserRepo;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.Id;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MyUserDetailsService detailsService;

    //test
    @Autowired
    private JavaMailSender mailSender;

    // bean from your SecurityConfig
    @Resource(name="authenticationManager")
    private AuthenticationManager authManager;


    public void register(User user, String siteURL)
        throws UnsupportedEncodingException, MessagingException {
        System.out.println(user);
            String verification = RandomString.make(50);
            user.setVerificationCode(verification);
            user.setEnabled(false);
        detailsService.addUser(user);
        sendVerificationEmail(user,siteURL);
    }
    private void sendVerificationEmail(User user, String siteUrl)
            throws MessagingException, UnsupportedEncodingException {
        String toAdress = user.getDecodedEmail();
        String fromAddress = "Stasa.Bestmail.com";
        String senderName = "SuperTeamAllstarsStraightAAAAS";
        String subject = "Please verify you registration";
        String content ="Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "SuperTeamAllstarsStraightAAAAS.";
        MimeMessage message= mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress,senderName);
        helper.setTo(toAdress);
        helper.setSubject(subject);

        content=content.replace("[[name]]", user.getUsername());
        String verifyUrl = siteUrl+"/verify/"+user.getVerificationCode();

        content = content.replace("[[URL]]", verifyUrl);
        helper.setText(content,true);

        mailSender.send(message);
        System.out.println("Email sent to " + toAdress);
        System.out.println("Verification code: " + user.getVerificationCode());
    }


    public boolean verify(String verificationCode) {
        User user = userRepo.findByVerificationCode(verificationCode);

        if(user==null || user.isEnabled()){
            return false;
        }else{
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepo.save(user);
            return true;
        }
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }

//  public User save(User user) {
//    return userRepo.save(user);
//  }

    public Optional<User> findById(long id) {
        if(userRepo.findById(id).isPresent()) {
            return Optional.of(userRepo.findById(id).get());
        }
        return Optional.empty();
    }

    public User findByUserName(String username) {
        if (userRepo.findByUsername(username) != null) {
            return userRepo.findByUsername(username);
        }
        return null;
    }

    public boolean findByEmail(String email) {
        if(userRepo.findByEmailInDatabase(Base64.getEncoder().encodeToString(email.getBytes())) != null){
            return true;
        }
        return false;
    }

    // hämta id
    // hämta user på id => myUserDetailService ändra värden.
    public String terminateUser(long userId) {
        //TODO: Kolla om användaren är admin eller ej

        for(String roles : userRepo.findUserRole(userId)){
            if (roles.equals("GROUPADMIN")) {
                return "Du måste gå ur dina grupper där du är Admin innan du kan stänga av ditt konto!";
            }
        }
        if(userRepo.existsById(userId)){
            User user = userRepo.findById(userId).get();
            detailsService.updateUser(user);
            return "Användaren är avstängd!";
        }

        return "Kunde inte hitta användaren!";
    }

    public boolean isAdmin(long id){
        return userRepo.findAdminById(id);

    }

    public void deleteById(long id) {

       // userRepo.deleteById(id);
    }

    public void updateById(long id, User user) {
        Optional<User> fromDb = findById(id);
        if(fromDb.isPresent()) {

            Field[] fields = user.getClass().getDeclaredFields(); // get all fields, even private one
            try {
                for(Field field : fields) {
                    field.setAccessible(true); // get access to private fields
                    if(field.get(user) != null && !field.isAnnotationPresent(Id.class)) {
                        field.set(fromDb, field.get(user));
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }

            detailsService.updateUser(fromDb.get());
        }
    }

    public @Nullable User whoAmI() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByEmail(email);
    }

}