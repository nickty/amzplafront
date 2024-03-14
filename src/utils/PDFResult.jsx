// PDFResult.js
import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 12,
  },
});

const PDFResult = ({ analysis }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* <View style={styles.section}>
            <Text style={styles.title}>SEO Analysis</Text>
            {Object.entries(analysis.seoDetails).map(([key, value]) => (
              <Text key={key} style={styles.listItem}>
                {key}: {value}
              </Text>
            ))}
          </View> */}
          <View style={styles.section}>
            <Text style={styles.title}>Semantic Tags</Text>
            {Object.entries(analysis.semanticTags).map(([key, value]) => (
              <Text key={key} style={styles.listItem}>
                {key}: {value}
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Accessibility Details</Text>
            {Object.entries(analysis.accessibilityDetails).map(
              ([key, value]) => (
                <Text key={key} style={styles.listItem}>
                  {key}: {value}
                </Text>
              )
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFResult;
