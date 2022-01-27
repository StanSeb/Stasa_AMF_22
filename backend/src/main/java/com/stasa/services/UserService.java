package com.stasa.services;

import com.stasa.configurations.MyUserDetailsService;
import com.stasa.entities.User;
import com.stasa.entities.VerificationCode;
import com.stasa.repositories.UserRepo;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.Id;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.sql.ClientInfoStatus;
import java.util.List;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

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




    //test
    public User register(User user, String siteURL)
        throws UnsupportedEncodingException, MessagingException{
            String verification = RandomString.make(50);
            user.setVerificationCode(verification);
            user.setEnabled(false);
        sendVerificationEmail(user,siteURL);
        return detailsService.addUser(user);
    }
     // i my user detail service högst upp
     //test
    private void sendVerificationEmail(User user, String siteUrl)
    throws MessagingException, UnsupportedEncodingException{
        String toAdress = user.getEmail();
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
        String verifyUrl = siteUrl+"/verify?code?"+user.getVerificationCode();

        content = content.replace("[[URL]]", verifyUrl);
        helper.setText(content,true);

        mailSender.send(message);

    }

    //test
    public boolean verify(String verificationCode){
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

    public User findById(long id) {
        if(userRepo.findById(id).isPresent()) {
            return userRepo.findById(id).get();
        }
        return null;
    }

    public void deleteById(long id) {
        userRepo.deleteById(id);
    }

    public void updateById(long id, User user) {
        User fromDb = findById(id);
        if(fromDb != null) {

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

            detailsService.updateUser(fromDb);
        }
    }

    /**
     * @return The logged-in user or null if not logged in.
     */
    public User whoAmI() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        // SecurityContextHolder.getContext() taps into the current session
        // getAuthentication() returns the current logged in user
        // getName() returns the logged in username (email in this case)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null) {
            String username = authentication.getName();
            return userRepo.findByUsername(username);
        }

        return null;
    }

    public User login(User user, HttpServletRequest req) {
        System.out.println("LOGIN ATTEMPT!");
        try {
            UsernamePasswordAuthenticationToken authReq
                    = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication auth = authManager.authenticate(authReq);

            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(auth);
            HttpSession session = req.getSession(true);
            session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
            System.out.println("NO EXCEPTION YET!");
        } catch(BadCredentialsException err) {
            throw new BadCredentialsException("Bad Credentials");
        }

        return whoAmI();
    }
}
