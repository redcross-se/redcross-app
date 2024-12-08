// DetailsGrid.js
import React from "react";
import { View, StyleSheet } from "react-native";
import DetailsRow from "./DetailsRow";

const DetailsGrid = ({ details, onEditField }) => {
  return (
    <View style={styles.gridContainer}>
      <View style={styles.row}>
        <View style={[styles.cell, styles.rightBorder]}>
          <DetailsRow
            label={details[0].label}
            value={details[0].value}
            field={details[0].field}
            onEditField={onEditField}
          />
        </View>
        <View style={styles.cell}>
          <DetailsRow
            label={details[1].label}
            value={details[1].value}
            field={details[1].field}
            onEditField={onEditField}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.cell, styles.rightBorder]}>
          <DetailsRow
            label={details[2].label}
            value={details[2].value}
            field={details[2].field}
            onEditField={onEditField}
          />
        </View>
        <View style={styles.cell}>
          <DetailsRow
            label={details[3].label}
            value={details[3].value}
            field={details[3].field}
            onEditField={onEditField}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  cell: {
    flex: 1,
    paddingVertical: 15,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderColor: "#DDD",
  },
});

export default DetailsGrid;
