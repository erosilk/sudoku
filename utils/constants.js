const GAME_SETTINGS = {
    difficultyMargins: {
        easy: [0, 1],
        medium: [2, 3],
        hard: [3, 5],
    },
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    rows: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    shadowedCells: [
        [['D', 'E', 'F'], [1, 2, 3, 7, 8, 9]],
        [['A', 'B', 'C', 'G', 'H', 'I'], [4, 5, 6]],
    ]
};

const STYLE_DEFAULTS = {
    colors: {
        layoutBg: "#1E103B",
    }
}

module.exports = {
    GAME_SETTINGS,
    STYLE_DEFAULTS
}