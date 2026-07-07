document.addEventListener("DOMContentLoaded", () => {

    const requestForm = document.getElementById("requestForm");

    if (!requestForm) return;

    requestForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        // Get all selected food categories
        const categories = Array.from(
            document.querySelectorAll('input[name="categories"]:checked')
        ).map(item => item.value);

        const formData = {
            name: requestForm.name.value,
            contact: requestForm.contact.value,
            categories: categories,
            dietaryNotes: requestForm.dietaryNotes.value,
            quantity: requestForm.quantity.value
        };

        try {

            const response = await fetch(
                "http://localhost:5678/webhook/request-food",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const message = document.getElementById("requestMessage");

            if (response.ok) {

                message.classList.remove("d-none");
                message.classList.add("alert-success");

                message.innerHTML =
                    "✅ Your request has been submitted successfully.";

                requestForm.reset();

            } else {

                message.classList.remove("d-none");
                message.classList.add("alert-danger");

                message.innerHTML =
                    "❌ Failed to submit request.";

            }

        } catch (error) {

            console.error(error);

            const message = document.getElementById("requestMessage");

            message.classList.remove("d-none");
            message.classList.add("alert-danger");

            message.innerHTML =
                "⚠️ Unable to connect to the FoodLink AI server.";

        }

    });

});