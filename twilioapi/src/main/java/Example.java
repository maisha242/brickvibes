import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class Example {
    public static final String ACCOUNT_SID = "AC51543edcf984036768026a598cb28400";
    public static final String AUTH_TOKEN = "a72af33fefdc7ea4e493a736d2b8f431";

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(new PhoneNumber("+17749224368"), new PhoneNumber("+15855492789"),
                "This is the ship that made the Kessel Run in fourteen parsecs?").create();
    }
}