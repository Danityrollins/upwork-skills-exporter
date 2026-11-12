// Object to hold skills and their counts
let skillsCount = {};

// Function to scan the page and update skillsCount
function scanAndUpdateSkillsCount() {
    // Clear the previous skills count
    skillsCount = {};
    const skillElements = document.querySelectorAll('.air3-token > span:first-child');
    skillElements.forEach(element => {
        const skill = element.textContent.trim();
        if (skill) {
            skillsCount[skill] = (skillsCount[skill] || 0) + 1;
        }
    });
}

// Immediately invoke the scanning function to account for the first page load
scanAndUpdateSkillsCount();

// Observer for page changes
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList") {
            // We assume a significant change in the DOM has happened (like AJAX page navigation), re-scan after a delay
            setTimeout(scanAndUpdateSkillsCount, 3000); // 3 seconds delay to wait for the content to load
        }
    });
});

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Start observing the target node for configured mutations
// Note: Adjust the targetNode selector to match the container of the job listings on Upwork
const targetNode = document.querySelector('#main'); // Replace '#main' with the correct selector

if (targetNode) {
    observer.observe(targetNode, config);
} else {
    console.error("The target node for observing changes wasn't found.");
}

// Function to export skills as CSV
function exportSkillsAsCSV() {
    // CSV header
    let csvContent = "Skill,Times Found\n";

    // Sort skills by count
    const sortedSkills = Object.entries(skillsCount).sort((a, b) => b[1] - a[1]);

    // Create CSV rows
    sortedSkills.forEach(([skill, count]) => {
        // Escape double quotes by doubling them
        const escapedSkill = skill.replace(/"/g, '""');

        // Enclose each field in double quotes and handle special characters
        csvContent += `"${escapedSkill}","${count}"\n`;
    });

    // Convert CSV string to data URI
    const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);

    // Create a link and download the CSV file
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'upwork_skills.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
}

// Listen for the message from the popup to export the data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "exportSkills") {
        exportSkillsAsCSV();
    }
});
