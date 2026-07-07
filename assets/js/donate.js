const form = document.getElementById("donationForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        business: form.business.value,
        food: form.food.value,
        quantity: form.quantity.value,
        expiry: form.expiry.value,
        location: form.location.value,
        email: form.email.value
    };

    const response = await fetch("http://localhost:5678/webhook/donate-food", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        alert("Donation submitted successfully!");
        form.reset();
    } else {
        alert("Something went wrong. Please try again.");
    }
});