import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";

const CustomPieChart = () => {
    // Sample data (ensure all `value` fields are numbers)
    const data = [
        { key: 1, value: 50, color: "#3498db" },
        { key: 2, value: 30, color: "#2ecc71" },
        { key: 3, value: 20, color: "#e74c3c" },
        { key: 4, value: 0, color: "#f1c40f" }, // Zero value (handled)
    ];

    // Filter out invalid values (iOS issue fix)
    const pieData = data
        .filter(item => typeof item.value === "number" && item.value > 0) // Only valid numbers > 0
        .map((item) => ({
            key: item.key,
            value: item.value,
            svg: { fill: item.color },
        }));

    console.log("PieChart Data:", pieData); // Debugging (Check in console)

    return (
        <View style={styles.chartWrapper}>
            {pieData.length > 0 ? (
                <PieChart style={{ height: 150, width: 150 }} data={pieData} />
            ) : (
                <Text style={styles.errorText}>No Data Available</Text>
            )}
            <View style={styles.chartOverlay}>
                <Text style={styles.chartCount}>100</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartWrapper: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    chartOverlay: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    chartCount: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CustomPieChart;
