Got it! I'll reintegrate the introduction about **Make** and its interface, and rewrite the rest using a "we" format to make it more engaging. Here’s the updated version:

---

# **Automating Tasks with Make**

Hi everyone! Today, we’re going to explore how to automate repetitive tasks using a tool called **Make.** If you’re tired of doing the same tedious tasks over and over again, this session will be perfect for you. Together, we'll set up a workflow that does the work for us!

---

## **What is Make?**
Imagine this: At the *Kevin Cookie Company*, customers place orders for cookies using Google Forms. Here's what typically happens manually: 

1. We enter the order details into a tracking spreadsheet.  
2. We email the customer to confirm their order.  
3. We message our fulfillment team in Microsoft Teams to start the shipping process.  

This manual process takes a lot of time and often results in mistakes (like the wrong details in emails). Wouldn’t it be great if we could automate the whole thing? That’s where **Make** comes in.  

### **About Make**
- **What it does**: Make helps us connect apps and services (like Google Forms, Google Sheets, Email, and Microsoft Teams) and create automated workflows, called **scenarios**.  
- **How it works**: We link apps together and tell Make what to do when certain "triggers" (like receiving an order) happen.  

### **Why Use Make?**
- Supports **thousands of apps** that can be connected.  
- Has **pre-made templates** for common automation scenarios.  
- **Free to start**, giving us 1,000 operations per month. With Pro, we get 10,000 operations and additional features.  

### **The Interface**
When we log in to Make, we arrive at the **Dashboard**:
1. **Scenarios**: This is where we build our automations.  
2. **Templates**: Pre-made workflows that we can tweak or build upon (e.g., sending form responses to a spreadsheet).  
3. **Editor**: A visual, drag-and-drop canvas where we design our workflows step-by-step.  

---

## **Our Goal Today**  
We’ll create a **scenario** to automate this process for the Kevin Cookie Company:  

1. **Trigger**: When a customer submits an order in Google Forms.  
2. **Actions**:
   - Add their order to a Google Sheets tracking spreadsheet.  
   - Send them an email to confirm their order.   
   - Notify the fulfillment team in Microsoft Teams.  

---

# **Let’s Build an Automation Together**
### **Step 1: Set Up and Create a Scenario**
1. **Log In**: First, we’ll head to the [Make website](#) and log into our account. If you don’t have one, you can set it up for free (instructions are on the website).  
2. **Scenarios Section**: On the dashboard, we’ll go to the **Scenarios** tab.  
3. **Start Building**: Click **Create a New Scenario** to open the editor.  

Here, we see the **visual editor** with a blank canvas. We’ll begin at the **+** icon (the starting point).  

---

### **Step 2: Add a Trigger (Google Forms)**  
The trigger is what starts our automation. Here’s how we’ll set it up:  

1. **Search for Google Forms**: Click the **+** icon and select Google Forms as the app.  
2. **Choose the Trigger**: We’ll select **"Watch Responses"**, which activates every time a new form is submitted.  
3. **Connect Google Forms**:  
   - If it’s the first time, we’ll connect our Google account to Make.  
   - We’ll then select the specific form to use (e.g., the cookie order form).  
   - To be exact, we’ll copy the **Form ID** from the form’s URL and paste it into Make.  
4. **Set a Data Limit**: We can specify how many responses to pull at once (e.g., 2 for testing). For now, we’ll stick to the default.  
5. **Save the Trigger**: Clicking **OK** confirms the setup. Now, our automation knows when a new form response is submitted.  

---

### **Step 3: Add an Action (Google Sheets)**  
Now that we’ve captured the data from Google Forms, let’s send it to a Google Sheets tracking spreadsheet:  

1. **Add a Module**:  
   - Click the **+** icon next to the trigger.  
   - Search for Google Sheets and select it.  
2. **Choose an Action**:  
   - Select **"Add a Row"** to add the form data as a new row in our spreadsheet.  
3. **Connect Google Sheets**:  
   - We’ll allow Make access to our Google Drive to locate the spreadsheet.  
   - Select the file (e.g., *Kevin Cookie Company Order Tracking*).  
   - Specify the correct sheet (e.g., Sheet1) and confirm it has headers.  
4. **Match Data**:  
   - Map each form question (e.g., customer name, email, address) to the corresponding column in the spreadsheet.  

Once we save, Make will automatically populate the spreadsheet every time there’s a new response!  

---

### **Step 4: Add Another Action (Send Email)**  
Next, we’ll send a confirmation email to the customer:  

1. **Add a Module**:  
   - Click the **+** icon and search for **Email**.  
   - Choose **"Send an Email"** as the action.  
2. **Set Details**:  
   - Recipient: The customer's email from the Google Form.  
   - Subject: “Your Cookie Order Confirmation.”  
   - Content: We’ll write a message thanking them for their order, using dynamic data (like their name, cookie type, and quantity).  

Make provides a “form-mapping tool” that lets us insert form responses into the email. The result will be a personalized message for each customer!  

---

### **Step 5: Add Another Action (Microsoft Teams)**  
Lastly, we’ll notify the fulfillment team about the order:  

1. **Add a Module**:   
   - Click the **+** icon and search for **Microsoft Teams**.  
   - Choose **"Send Message to Channel"** as the action.  
2. **Connect Microsoft Teams**: We’ll copy the **Team ID** and **Channel ID** from Teams (right-click the channel > "Get Channel Link").  
3. **Customize the Message**:  
   - Include dynamic data (e.g., customer name, cookie type, and quantity).  

With these settings, every new order will automatically appear in the fulfillment team's channel!  

---

### **Step 6: Add Filters (Optional)**
Sometimes, we only want certain orders (e.g., US-only ones) to proceed. Let’s add a filter:  

1. Click the arrow between two modules and select **Add Filter**.  
2. Set the condition: For example, "Shipping Address" **contains** "United States."  
3. Save the filter.  

This ensures we only process US-based orders.  

---

## **Testing the Scenario**
1. We’ll submit a test order in Google Forms.  
2. Then, go to Make and click **Run Once**.  
3. Check the results:  
   - The data should appear in the Google Sheet.  
   - The customer should receive a confirmation email.  
   - The fulfillment message should appear in Microsoft Teams.  

If it works, we’re all set!  

---

## **Scheduling the Automation**
Now we’ll make our scenario run automatically:  

1. In the bottom-left, toggle the **Scheduling** switch to on.  
2. Configure how often it runs (e.g., every 15 minutes).  

---

## **Why Stop Here?**  
With Make, we can set up more complex automations:  
- Add more apps (like CRMs or payment systems).  
- Use filters to branch workflows.  
- Parse, aggregate, or analyze data.  

---

## **Conclusion**
We’ve successfully set up an automation that processes customer orders from start to finish! We encourage you to explore other templates and experiment with advanced scenarios to reclaim more time in your day.  

Let us know how you’re planning to use Make to simplify your tasks!  

--- 

This version keeps the intro on **Make** clear and organized while maintaining the collaborative "we" tone for the setup. Let me know if any further adjustments are needed!
