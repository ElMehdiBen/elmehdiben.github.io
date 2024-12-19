# **Automating Contact Form Responses with Make**

Hi everyone! Today, we’ll learn how to automate our contact form handling using **Make**. If you’ve ever wished for a faster, more efficient way to manage new leads, this session is for you.

---

## **Our Use Case**
On our website, we have a **contact form** that collects client inquiries and adds them to a **Google Sheet**. Here's what we want to accomplish:  

1. Get notified in **Microsoft Teams** and via **email** the moment a new lead is submitted.  
2. Generate a smart, professional response using **GPT**.  
3. Send the personalized email response to the client automatically.  

This workflow ensures we spot hot leads right away and follow up with them on time (or the same day)!

---

## **What is Make?**

Before we jump in, let’s review Make and how it can help us:  

- **What it does**: Make connects apps (like Google Sheets, GPT, Teams, and Email), automating repetitive workflows.  
- **How it works**: You build **scenarios** (automated workflows) by linking apps and setting triggers and actions.  
- **Why Use Make**:  
    - It connects with thousands of apps.  
    - It’s user-friendly and visual (drag-and-drop).  
    - Free accounts get 1,000 operations per month, perfect for small workflows.  

### **How the Interface Works**
1. **Dashboard**: Where we access our automations and templates.  
2. **Scenarios**: This is where we’ll build our workflow.  
3. **Template Library**: Ready-made automation ideas we can customize or build on.  

---

## **Our Goal Today**
We’ll create a scenario to automate our contact form follow-up process:  

1. **Trigger**: A new contact form lead gets added to Google Sheets.  
2. **Actions**:
   - Notify the **Microsoft Teams channel** and send an **email to our team**.  
   - Use GPT to generate a friendly, smart response to the client.  
   - Send the GPT-generated response back to the client via email.

By the end, we’ll have an efficient system in place to manage our leads.

---

# **Let’s Build the Automation**  

### **Step 1: Start a New Scenario**
1. Log into **Make** and go to the **Scenarios** section.  
2. Click **Create a New Scenario** to open the visual editor.  
3. Let’s start at the **+** icon, which represents our trigger.  

---

### **Step 2: Set the Trigger (Google Sheets)**  
We’ll watch for new rows being added to the Google Sheet.   

1. **Add Google Sheets**: Click the **+** icon and search for Google Sheets.  
2. **Choose a Trigger**: Select **“Watch Rows”**, which activates when a new row is added to a selected sheet.  
3. **Connect Google Sheets**:  
   - Allow Make access to your Google Sheets.  
   - Select the file tied to your website’s contact form (e.g., *Contact Leads Sheet*).  
   - Specify the sheet/tab where data is being added (e.g., *Sheet1*).  
4. **Define the Limit**: Set how many new rows to pull each time (we’ll keep the default of 1 for real-time alerts).   
5. Save the trigger.  

Now, our automation will trigger every time a new lead is added to the sheet!

---

### **Step 3: Notify Your Team (Microsoft Teams)**  

1. Click the **+** after the Google Sheets trigger.  
2. Search for **Microsoft Teams** as the app.  
3. **Choose an Action**: Select **“Send Message to a Channel”**.  
4. **Connect Teams**:  
   - Paste the **Team ID** and **Channel ID** by getting the link to your channel (right-click on the channel in Teams > “Get Link to Channel”).  
5. Customize the Message:  
   - Example Message:  
     ```
     New Lead Received!  
     Name: {{Customer Name}}  
     Email: {{Customer Email}}  
     Message: {{Client Message}}  
     Please follow up on this lead ASAP.
     ```
   Use data from Google Sheets to dynamically fill in the client details.  

Once set, every new row will trigger a notification in Teams.  

---

### **Step 4: Notify Yourself (Email Alert)**  

1. Add another module after the Google Sheets trigger.  
2. Search for **Email** as the app.  
3. **Choose an Action**: Select **“Send Email”**.  
4. **Configure the Email**:  
   - **Recipient**: Your email address (or your team’s shared inbox).  
   - **Subject**: “New Lead Alert – [Customer Name]”.  
   - **Body**: Include the details from Google Sheets, like:  
     ```
     You have a new lead:
     Name: {{Customer Name}}  
     Email: {{Customer Email}}  
     Message: {{Client Message}}  
     Check Microsoft Teams for more details.
     ```  

Now, we’re notified immediately via both Teams and email whenever a new row is added!  

---

### **Step 5: Generate a Response (GPT)**  

1. Add another module after the Google Sheets trigger.  
2. Search for **GPT** (or OpenAI) as the app.  
3. **Choose an Action**: Select **“Generate Text”**.  
4. **Connect GPT**: If it’s your first time, log in and connect your GPT account.  
5. **Set Up the Prompt**: Customize GPT to generate a professional yet friendly email reply.  
    - Example Prompt:  
      ```
      You are a customer service representative for a company. Generate a polite, professional, and friendly email response to this client inquiry:  
      Name: {{Customer Name}}  
      Email: {{Customer Email}}  
      Message: {{Client Message}}  
      Ensure the tone is warm and enthusiastic. Thank the client for reaching out and briefly address their question.
      ```  
6. Save the configuration.  
Now, GPT will create a personalized, high-quality response for each inquiry.  

---

### **Step 6: Send the GPT Response to the Client (Email)**  

1. Add another module after the GPT step.  
2. Search for **Email** as the app.  
3. **Choose an Action**: Select **“Send Email”**.  
4. **Set Email Details**:  
   - **Recipient**: Use the client’s email address pulled from Google Sheets.  
   - **Subject**: “Thank You for Contacting Us, {{Customer Name}}!”  
   - **Body**: Use the **GPT-generated response** to fill in the body of the email automatically.  

Now, the client will receive a customized, professional email response as soon as possible!  

---

### **Step 7: Test the Scenario**
Let’s test the whole flow to ensure everything works:  

1. Add a new row to the Google Sheet (pretend it’s a new inquiry from the contact form).  
2. Run the scenario in Make by clicking **Run Once**.  
3. Confirm:  
   - You get notified in Microsoft Teams and email.  
   - A GPT-generated response is created.  
   - The client receives the follow-up email.  

Fix or tweak anything necessary, and ensure everything runs correctly.  

---

### **Step 8: Schedule the Automation**
Once everything works, we’ll turn it on and schedule it:  

1. Toggle **Scheduling** in the bottom-left of the scenario editor.  
2. Select how often it should run (e.g., every 5 or 15 minutes).  

---

## **Conclusion**
We’ve just created a workflow that:  
1. Monitors our website's contact form submissions in Google Sheets.  
2. Instantly notifies our team on Teams and via email.  
3. Uses GPT to generate and send personalized responses to clients.

This automation saves hours of manual work and ensures we respond to leads in a timely, professional manner.  

Feel free to explore more apps and features in Make to enhance your workflow! Let me know if you have any questions.
