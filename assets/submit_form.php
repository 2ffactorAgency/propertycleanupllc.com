
<?php
// Check if the form has been submitted using POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $firstName = strip_tags(trim($_POST["firstName"]));
    $lastName = strip_tags(trim($_POST["lastName"]));
    $streetAddress = strip_tags(trim($_POST["streetAddress"]));
    $city = strip_tags(trim($_POST["city"]));
    $state = strip_tags(trim($_POST["state"]));
    $zipCode = strip_tags(trim($_POST["zipCode"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $servicesNeeded = isset($_POST['servicesNeeded']) ? implode(", ", $_POST['servicesNeeded']) : 'None';
    $projectDescription = strip_tags(trim($_POST["projectDescription"]));

    // Validate that the email address is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Email content
    $subject = "New Contact Form Submission";
    $email_content = "Name: $firstName $lastName\n";
    $email_content .= "Address: $streetAddress, $city, $state, $zipCode\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Services Requested: $servicesNeeded\n";
    $email_content .= "Project Description: $projectDescription\n";

    // Email headers
    $email_headers = "From: $firstName <$email>";

    // Send the email service@propertycleanupllc.com
    if (mail('ibikatti@gmail.com', $subject, $email_content, $email_headers)) {
        // Redirect to success page
        header("Location: /contactar/success.html");
        exit;
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // Not a POST request, display an error
    echo "Oops! Something went wrong.";
}