# brickvibes

## Inspiration

When you're listening to Spotify, do you just stop and wonder why you're listening to the Gummy Bear song at 2 am? BrickVibes can answer that! With BrickVibes you can find out cool, quirky information about yourself that you might not be aware of and receive regular updates on your vibe! Whether you're feeling happy, sad, anxious, or anything in between, BrickVibe provides resources to support your well-being. With a solid foundation of self-awareness and mental health, you can build a happier and more fulfilling life brick by brick. So why wait?

Start by connecting your Spotify account and BrickVibes will text you a response based on your recently played songs!

"Hey BrickVibes team, we still don't get it." - incredibly cool judges
"By using your recently played songs, BrickVibes aims to assist you in recognizing your different mental states and provide advice. For example if you're listening to the Gummy Bear song on repeat, you might get a response like **'Based on your taste in music, you have a colorful and squishy personality. Congratulations and keep up the good vibes'** or **'Please go to bed'** " - also incredibly cool BrickVibes team members that would love a Co-Op :)

## What it does
BrickVibes connects to Spotify and formulates and sends a response to the user about the their mental state based on the ten most recently played songs on their account.
//Using your recently played songs from your Spotify account, BrickVibes uses OpenAI's API to formulate responses that get sent to your phone using Twilio! 

## How we built it
This was built through a combination of the Spotify, OpenAI, and Twilio APIs. Spotify is used to get the user's most recent played tracks, OpenAI is used to generate a response about the user's mental state based off of the response from Spotify, and Twilio is used to send these generated messages to the user.
 
- ♡ JavaScript for.... everything (we are using Express too lol)
- ♡ Node.js to make API calls
- ♡ BootStrap template (HTML/CSS/JS) for the front-end and changed it up.
- ♡ Twilio for the SMS messaging for notifications
- ♡ GitHub for Version Control, Pull requests, Merges, Releases, and Pages

## Challenges we ran into
- ♡ Node.js doesn't make sense when you're in a time crunch and only remember Angular and React
- ♡ Connecting everything is hard. :(
- ♡ API keys expire often, so we would need to regenerate new ones each time they did
- ♡ JavaScript hard 
- ♡ Input box hard?? CSS what???
- ♡ Why is documentation so hard to understand
- ♡ Why does Google not have all of the answers 

## Accomplishments that we're proud of
After a long, painful, sleepless weekend, we are happy to say BrickVibes is fully functional and meets all of our initial requirements! We even had hackers from other BrickHack teams try our app out, and they let us know how much they loved it! We met some new people and reconnected with some old ones! Also, we set up a tent in Fireside Lounge with a cot! **Cool pictures are found in Project Media!**

**Disclaimer: We only had 4 people in our team. We just like talking...."**

## What we learned
- ♡ THE POWER OF FRIENDSHIP (every hacker was so nice and helped us)
- ♡ New skills for each of us individually. Node.js.....
- ♡ Documentation is hard to read when you don't know what's going on but Dev Forums exist
- ♡ Integrating multiple APIs within one application that all have a different way to interact :)

## What's next for BrickVibes
The direction for BrickVibes in the future looks bright. Some additional requirements that may be added to BrickVibes in the future are as follows:
- ♡ Allow the user to let BrickVibes know how they are feeling and recommend songs for them to listen to depending on their mood.
- ♡ Share status messages with friends!
- ♡ Allow users to report whether or not BrickVibe's mood readings were accurate.
- ♡ Provide the user with mood ratings of their different playlists.
