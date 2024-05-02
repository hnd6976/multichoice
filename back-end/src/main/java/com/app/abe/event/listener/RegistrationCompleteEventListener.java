package com.app.abe.event.listener;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.app.abe.models.User;
import com.app.abe.services.UserService;
import com.app.abe.event.RegistrationCompleteEvent;
import java.io.UnsupportedEncodingException;
import java.util.Random;
import java.util.UUID;

/**
 * @author Sampson Alfred
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {
	@Autowired
 private UserService userService;
	@Autowired
 private  JavaMailSender mailSender;
 private  User theUser;
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        theUser = event.getUser();
        String type=event.getType();
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
    	String verificationToken=String.format("%06d", number);
            userService.saveUserVerificationToken(theUser, verificationToken);
            String url = event.getApplicationUrl()+"/api/auth/verifyEmail?token="+verificationToken;
            try {
                sendVerificationEmail(theUser,url,verificationToken);
            } catch (MessagingException | UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
        
        
        //log.info("Click the link to verify your registration :  {}", url);
    }
    public void sendVerificationEmail(User user,String url,String token) throws MessagingException, UnsupportedEncodingException {
        String subject = "Email Verification";
        String senderName = "User Registration Portal Service";
        String mailContent = "<p> Hi "+ user.getUsername()+ ", </p>"+
                "<p>Thank you for registering with us,"+"" +
                "Your code is: </p>"+token;
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("deb1909901@student.ctu.edu.vn", senderName);
        messageHelper.setTo(user.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }
    public void sendDownloadEmail(User user,String url) throws MessagingException, UnsupportedEncodingException {
    	String link="https://res.cloudinary.com/dqfyfxb2r/image/upload/v1700276414/" +url+".pdf";
    	String subject = "Download Document";
        String senderName = "POSPY";
        String mailContent = "<p> Hi "+ user.getUsername()+ ", </p>"+
                "<p>Click <b><a href=\""+link+"\">here</a></b>"+" " +
                "to download document </p>";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("deb1909901@student.ctu.edu.vn", senderName);
        messageHelper.setTo(user.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }
    public String sendPasswordResetVerificationEmail(User user,String url,String token) throws MessagingException, UnsupportedEncodingException {
    	
        
    	String subject = "Reset Password";
        String senderName = "POSPY";
        String mailContent = "<p> Hi "+ user.getUsername()+ ", </p>"+
                "<p><b>You recently requested to reset your password,</b>"+"" +
                "Your code is: </p>"+token;
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("deb1909901@student.ctu.edu.vn", senderName);
        messageHelper.setTo(user.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
        return url;
    }
    
}

