window.addEventListener('DOMContentLoaded', () => {

    // --- HOMEPAGE LOGIC ---
    // This block only runs if it finds the 'timer-container' on the page
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
            const messageElement = document.getElementById("milestone-text");
            if (soonestMilestoneDate) {
                const distance = soonestMilestoneDate - now;
                const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
                messageElement.textContent = `${days} days until ${soonestMilestoneName}`;
            } else {
                messageElement.textContent = "No upcoming milestones!";
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
        if (triggerHeart) {
            triggerHeart.addEventListener('click', triggerHeartsAnimation);
        }

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
        if (newReasonButton) {
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
    }

    // --- TIMELINE PAGE LOGIC ---
    // This block only runs if it finds the 'timeline-container' on the page
    if (document.getElementById('timeline-container')) {
        
        function parseFrontMatter(content) {
          const match = /^---\n([\s\S]*?)\n---/.exec(content);
          if (!match) return { attributes: {}, body: content };
          const rawAttrs = match[1];
          const body = content.slice(match[0].length);
          const attributes = {};
          rawAttrs.split("\n").forEach(line => {
            const [key, ...rest] = line.split(":");
            if (key) attributes[key.trim()] = rest.join(":").trim();
          });
          return { attributes, body };
        }

        async function buildTimeline() {
            const timelineContainer = document.getElementById('timeline-container');
            // 🚨 IMPORTANT: Replace this with your GitHub username and repository name
            const repoURL = 'https://api.github.com/repos/B-Munkh/Little-Corner/contents/_timeline';

            try {
                const response = await fetch(repoURL);
                if (!response.ok) {
                    throw new Error(`GitHub API responded with ${response.status}`);
                }
                const files = await response.json();
                const memoryFiles = files.filter(file => file.type === 'file' && file.name.endsWith('.md'));
                const memoriesData = memoryFiles.map(file => {
                    const decodedContent = atob(file.content);
                    const content = parseFrontMatter(decodedContent);
                    if (content.attributes.date) {
                        content.attributes.date = new Date(content.attributes.date);
                    }
                    return content;
                }).sort((a, b) => {
                    if (!a.attributes.date || !b.attributes.date) return 0;
                    return a.attributes.date - b.attributes.date;
                });

                let timelineHTML = '';
                for (const memory of memoriesData) {
                    const { date, title, image, body } = memory.attributes;
                    if (date) {
                        const formattedDate = date.toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        });
                        timelineHTML += `
                            <div class="timeline-event">
                                <div class="timeline-content">
                                    ${image ? `<img src="${image}" alt="${title || ''}">` : ''}
                                    <div class="timeline-date">${formattedDate}</div>
                                    <h3>${title || ''}</h3>
                                    <p>${body}</p>
                                </div>
                            </div>
                        `;
                    }
                }
                timelineContainer.innerHTML = timelineHTML;
            } catch (error) {
                console.error('Error fetching timeline data:', error);
                timelineContainer.innerHTML = '<p>Could not load memories. Please check the repository name in script.js and ensure the repo is public.</p>';
            }
        }
        buildTimeline();
    }
});