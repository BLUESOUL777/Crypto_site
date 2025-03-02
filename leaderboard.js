document.addEventListener("DOMContentLoaded", () => {
    const leaderboardTable = document.getElementById("leaderboard");
    const clearBtn = document.getElementById("clear-btn");
    const homeBtn = document.getElementById("home-btn");

    function getLeaderboard() {
        return JSON.parse(localStorage.getItem("cryptoLeaderboard")) || [];
    }

    function updateLeaderboard() {
        let scores = getLeaderboard();
        scores.sort((a, b) => b.score - a.score); // Sort by highest score

        leaderboardTable.innerHTML = ""; // Clear table

        scores.forEach((entry, index) => {
            let row = `<tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
            </tr>`;
            leaderboardTable.innerHTML += row;
        });
    }

    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("cryptoLeaderboard");
        updateLeaderboard();
    });

    homeBtn.addEventListener("click", () => {
        window.location.href = "../index.html";
    });

    updateLeaderboard();
});
