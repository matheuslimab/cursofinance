module.exports =  {
    preset: "jest-expo",
    testPathIgnorePatterns: [
        "/android",
        "/node_modules",
        "/ios"
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-native/extend-expect"
    ]
}