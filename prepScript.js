// Add Guidance
document.getElementById("guidanceForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        companyName: companyName.value,
        jobRole: jobRole.value,
        requiredSkills: requiredSkills.value.split(","),
        checklist: checklist.value,
        resources: resources.value
    };

    await fetch("/api/guidance/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Guidance Added Successfully!");
    location.reload();
});

// Load Guidance
window.onload = async () => {
    const container = document.getElementById("guidanceContainer");

    if (container) {
        const res = await fetch("/api/guidance/all");
        const data = await res.json();

        displayData(data);

        document.getElementById("searchBox")?.addEventListener("input", function() {
            const keyword = this.value.toLowerCase();
            const filtered = data.filter(item =>
                item.companyName.toLowerCase().includes(keyword) ||
                item.jobRole.toLowerCase().includes(keyword)
            );
            displayData(filtered);
        });

        function displayData(list) {
            container.innerHTML = "";
            list.forEach(item => {
                container.innerHTML += `
                    <div class="card">
                        <h3>${item.companyName} - ${item.jobRole}</h3>
                        <p><b>Skills:</b> ${item.requiredSkills.join(", ")}</p>
                        <p><b>Checklist:</b> ${item.checklist}</p>
                        <p><b>Resources:</b> ${item.resources}</p>
                    </div>
                `;
            });
        }
    }
};