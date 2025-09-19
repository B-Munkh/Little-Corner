window.addEventListener('DOMContentLoaded', () => {
    // --- Timer Code (Stays the same) ---
    function updateTimer() {
        const startDate = new Date("2025-02-19T00:00:00"); 
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += daysInLastMonth;
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        document.getElementById("years").textContent = years.toString().padStart(2, "0");
        document.getElementById("months").textContent = months.toString().padStart(2, "0");
        document.getElementById("days").textContent = days.toString().padStart(2, "0");
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    function displayNextMilestone() {
        const now = new Date();

        const milestones = [
            { date: "2026-02-19T00:00:00", name: "1 Year Anniversary!" },
            { date: "2027-11-16T00:00:00", name: "1000 Days Together!" },
        ];
        let soonestMilestoneDate = null;
        let soonestMilestoneName = "";

        // This loop is perfect. Its only job is to FIND the next milestone.
        for (const milestone of milestones) {
            const milestoneDate = new Date(milestone.date);
            if (milestoneDate > now && (!soonestMilestoneDate || milestoneDate < soonestMilestoneDate)) {
                soonestMilestoneDate = milestoneDate;
                soonestMilestoneName = milestone.name;
            }
        }

        // --- All this logic now runs AFTER the loop is finished ---

        // First, check if a future milestone was actually found
        if (soonestMilestoneDate) {
            const distance = soonestMilestoneDate - now;
            const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
            const message = `${days} days until ${soonestMilestoneName}`;
            const messageElement = document.getElementById("milestone-text");
            messageElement.textContent = message;
        } else {
            // Optional: What to display if all milestones are in the past
            const messageElement = document.getElementById("milestone-text");
            messageElement.textContent = "No upcoming milestones!";
        }
    }

    // Call your new function just ONCE when the page loads
    displayNextMilestone();

    // --- NEW Floating Hearts Click-Trigger Code ---

    // 1. Get references to the heart container and the clickable heart
    const container = document.getElementById('hearts-container');
    const triggerHeart = document.getElementById('trigger-heart');

    // 2. This function will create the hearts when called
    function triggerHeartsAnimation() {
        const numberOfHearts = 20;

        for (let i = 0; i < numberOfHearts; i++) {
            createHeart();
        }
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${5 + Math.random() * 5}s`;
        
        const size = 10 + Math.random() * 20;
        heart.style.setProperty('--heart-size', `${size}px`);

        container.appendChild(heart);

        // Remove the heart from the HTML after its animation finishes
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
    
    // 3. Listen for a 'click' on the beating heart and run the animation function
    triggerHeart.addEventListener('click', triggerHeartsAnimation);
});