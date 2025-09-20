window.addEventListener('DOMContentLoaded', () => {

    // --- HOMEPAGE LOGIC ---
    // Checks if we are on the homepage by looking for the timer container
    if (document.getElementById('timer-container')) {
        
        // --- Timer Code ---
        function updateTimer() {
            const startDate = new Date("2025-02-19T00:00:00"); 
            const now = new Date();

            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();
            let hours = now.getHours() - startDate.getHours();
            let minutes = now.getMinutes() - startDate.getMinutes();
            let seconds = now.getSeconds() - startDate.getSeconds();

            if (seconds < 0) { seconds += 60; minutes--; }
            if (minutes < 0) { minutes += 60; hours--; }
            if (hours < 0) { hours += 24; days--; }
            if (days < 0) {
                const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
                days += daysInLastMonth;
                months--;
            }
            if (months < 0) { months += 12; years--; }

            document.getElementById("years").textContent = years.toString().padStart(2, "0");
            document.getElementById("months").textContent = months.toString().padStart(2, "0");
            document.getElementById("days").textContent = days.toString().padStart(2, "0");
            document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
        }
        setInterval(updateTimer, 1000);
        updateTimer();

        // --- Milestone Code ---
        function displayNextMilestone() {
            const now = new Date();
            const milestones = [
                { date: "2026-02-19T00:00:00", name: "1 Year Anniversary!" },
                { date: "2027-11-16T00:00:00", name: "1000 Days Together!" },
            ];
            let soonestMilestoneDate = null;
            let soonestMilestoneName = "";
            for (const milestone of milestones) {
                const milestoneDate = new Date(milestone.date);
                if (milestoneDate > now && (!soonestMilestoneDate || milestoneDate < soonestMilestoneDate)) {
                    soonestMilestoneDate = milestoneDate;
                    soonestMilestoneName = milestone.name;
                }
            }
            if (soonestMilestoneDate) {
                const distance = soonestMilestoneDate - now;
                const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
                document.getElementById("milestone-text").textContent = `${days} days until ${soonestMilestoneName}`;
            } else {
                document.getElementById("milestone-text").textContent = "No upcoming milestones!";
            }
        }
        displayNextMilestone();

        // --- Floating Hearts Code ---
        const container = document.getElementById('hearts-container');
        const triggerHeart = document.getElementById('trigger-heart');
        function triggerHeartsAnimation() {
            for (let i = 0; i < 20; i++) { createHeart(); }
        }
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${5 + Math.random() * 5}s`;
            const size = 10 + Math.random() * 20;
            heart.style.setProperty('--heart-size', `${size}px`);
            container.appendChild(heart);
            heart.addEventListener('animationend', () => { heart.remove(); });
        }
        triggerHeart.addEventListener('click', triggerHeartsAnimation);

        // --- "Reasons Why" Code ---
        const reasons = [
            "You always show that you care about me",
            "You never make me feel like I'm being weird",
            "We can laugh about anything and everything together",
            "Your smile lights up the entire room",
            "Your eyes are filled with warmth and love when you look at me",
            "You make me feel right at home, no matter where we are",
            "You're the one person who I look forward to seeing and talking to everyday",
        ];
        const reasonText = document.getElementById("reason-text");
        const newReasonButton = document.getElementById("new-reason-button");
        let lastReasonIndex = -1;
        newReasonButton.addEventListener('click', () => {
            reasonText.classList.add('faded-out');
            setTimeout(() => {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * reasons.length);
                } while (reasons.length > 1 && newIndex === lastReasonIndex);
                lastReasonIndex = newIndex;
                reasonText.textContent = reasons[newIndex];
                reasonText.classList.remove('faded-out');
            }, 300);
        });
    }

    // --- TIMELINE PAGE LOGIC ---
    // Checks if we are on the timeline page
    if (document.getElementById('timeline-container')) {
        
        async function buildTimeline() {
            const timelineContainer = document.getElementById('timeline-container');
            const repoURL = 'https://api.github.com/repos/B-Munkh/Little-Corner/contents/_timeline';            try {
                // 1. Fetch the list of memory files from GitHub
                const response = await fetch(repoURL);
                const files = await response.json();

                // 2. Fetch the content of each file
                const memoryPromises = files.map(async (file) => {
                    const fileResponse = await fetch(file.download_url);
                    return await fileResponse.text();
                });
                const memories = await Promise.all(memoryPromises);

                // 3. Process and sort memories by date
                const memoriesData = memories.map(mem => {
                    const content = frontMatter(mem);
                    content.attributes.date = new Date(content.attributes.date);
                    return content;
                }).sort((a, b) => a.attributes.date - b.attributes.date); // Sort oldest to newest

                // 4. Build the HTML for each memory
                let timelineHTML = '';
                for (const memory of memoriesData) {
                    const { date, title, image } = memory.attributes;
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    });
                    
                    timelineHTML += `
                        <div class="timeline-event">
                            <div class="timeline-content">
                                ${image ? `<img src="${image}" alt="${title}">` : ''}
                                <div class="timeline-date">${formattedDate}</div>
                                <h3>${title}</h3>
                                <p>${memory.body}</p>
                            </div>
                        </div>
                    `;
                }

                // 5. Add the generated HTML to the page
                timelineContainer.innerHTML = timelineHTML;

            } catch (error) {
                console.error('Error fetching timeline data:', error);
                timelineContainer.innerHTML = '<p>Could not load memories. Please check the repository name in script.js and ensure the repo is public.</p>';
            }
        }

        buildTimeline();
    }
});