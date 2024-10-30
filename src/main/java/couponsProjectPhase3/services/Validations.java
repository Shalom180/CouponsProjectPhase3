package couponsProjectPhase3.services;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validations {
    public static boolean isValidEmail(String input) {
        String emailRegex =
                "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
        Pattern emailPat = Pattern.compile(emailRegex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = emailPat.matcher(input);
        return matcher.find();
    }

    public static boolean isValidPassword(String password) {
        // Regex to check valid password.
        String regex = "^(?=.*[0-9])"
                + "(?=.*[a-z])(?=.*[A-Z])"
                + "(?=.*[!@#$}{%&*()+=^._,:'`~;-])"
                + "(?=\\S+$).{8,20}$";
        // Compile the ReGex
        Pattern p = Pattern.compile(regex);
        // If the password is empty
        // return false
        if (password == null) {
            return false;
        }
        // Pattern class contains matcher() method
        // to find matching between given password
        // and regular expression.
        Matcher m = p.matcher(password);
        // Return if the password
        // matched the ReGex
        return m.matches();
    }



    public static boolean onlyAlphabets(String str)
    {
        // Return false if the string
        // has empty or null
        if (str == null || str.isEmpty()) {
            return false;
        }
        ArrayList<Character> alphabets = new ArrayList<Character>();
        String alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(int i=0;i<alpha.length();i++)
        {
            alphabets.add(alpha.charAt(i));
        }
        // Traverse the string from
        // start to end
        for (int i = 0; i < str.length(); i++) {
            // Check if the specified
            // character is not a letter then
            // return false,
            // else return true
            if (!alphabets.contains(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

}

