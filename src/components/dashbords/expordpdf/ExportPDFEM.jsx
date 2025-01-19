import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { FaFilePdf } from "react-icons/fa";

import lg from "../../../assets/images/LOGO.png";
// import ds from "../../assets/images/1.jpg";
import logopdf from "../../../assets/images/logopdf.png";
Font.register({
  family: "Noto Sans Thai",
  src: "/fonts/NotoSansThai-VariableFont_wdth,wght.ttf",
});
import PropTypes from "prop-types";
// import PropTypes from "prop-types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Noto Sans Thai",
    padding: 30,
    fontSize: "10px",
    lineHeight: 2.1,
    position: "relative",
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.1,
  },
  watermark: {
    maxWidth: "60%", // หรือระบุขนาดที่เหมาะสม เช่น 80% ของความกว้างหน้า
    maxHeight: "60%",
  },
  imageds: {
    width: "100%", // หรือกำหนดขนาดที่ต้องการ
    maxWidth: "40%", // ขนาดสูงสุดของภาพ
    height: "auto", // ให้ปรับตามอัตราส่วน
  },
  logopd: {
    maxWidth: "35%", // ขนาดสูงสุดของภาพ
    height: "auto", // ให้ปรับตามอัตราส่วน
  },
  section: {
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "12px",
  },

  tableRowHander: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },

  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    padding: 5,
  },
  tableColumn: {
    flex: 1,
    width: "30%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  sectionhandder: {
    display: "flex",
    flexDirection: "row", // จัดเรียงในแนวนอน
    justifyContent: "space-between", // เว้นช่องว่างระหว่างองค์ประกอบ
    alignItems: "center", // จัดกึ่งกลางแนวตั้ง
    marginBottom: 10,
  },
});

const PDFContentEM = ({ data, year, month }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* ลายน้ำ */}
      <View style={styles.watermarkContainer}>
        <Image
          src={lg} // ใส่ URL หรือ Path ของรูปภาพ
          style={styles.watermark}
        />
      </View>
      {/* ข้อมูล */}
      <View style={styles.section}>
        <View style={styles.sectionhandder}>
          <Image
            src={logopdf} // ใส่ URL หรือ Path ของรูปภาพ
            style={styles.logopd}
          />
          <View>
            <Text style={styles.boldText}>รายละเอียดข้อมูลพนักงาน</Text>
            <Text style={styles.boldText}>
              {" "}
              {year ? `ปี ${year}` : ""} {month ? `เดือน ${month}` : ""}{" "}
            </Text>
          </View>
        </View>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.boldText}>ข้อมูลพนักงาน </Text>
              <View
                style={[
                  {
                    padding: 4, // กำหนด padding ที่นี่
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: "10px",
                    },
                  ]}
                >
                  ชื่อพนักงาน : {item.employeeName}{" "}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: "10px",
                    },
                  ]}
                >
                  กลุ่มงาน : {item.groupworkName}{" "}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: "10px",
                    },
                  ]}
                >
                  จำนวนงาน : {item.workCount}{" "}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.boldText}>งานที่ให้บริการ </Text>
                <View
                  style={[
                    styles.tableRow,
                    {
                      fontSize: "10px",
                      borderTop: "1px solid #ddd",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tableColumn,
                      {
                        fontSize: "10px",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    หน่วยงานที่ให้บริการ{" "}
                  </Text>
                  <Text
                    style={[
                      styles.tableColumn,
                      {
                        fontSize: "10px",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    ประเภทงาน{" "}
                  </Text>
                  <Text
                    style={[
                      styles.tableColumn,
                      {
                        fontSize: "10px",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    วันที่ให้บริการ{" "}
                  </Text>
                </View>
                {item.services.map((service, serviceIndex) => (
                  <View key={serviceIndex} style={styles.tableRow}>
                    <Text
                      style={[
                        styles.tableColumn,
                        {
                          fontSize: "8px",
                        },
                      ]}
                    >
                      {service.affiliationName}
                    </Text>
                    <Text
                      style={[
                        styles.tableColumn,
                        {
                          fontSize: "8px",
                        },
                      ]}
                    >
                      {service.workType}
                    </Text>
                    <Text
                      style={[
                        styles.tableColumn,
                        {
                          fontSize: "8px",
                        },
                      ]}
                    >
                      {new Date(service.serviceDate).toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text>ไม่มีข้อมูล</Text>
        )}
      </View>
    </Page>
  </Document>
);
PDFContentEM.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      employeeName: PropTypes.string.isRequired,
      groupworkName: PropTypes.string.isRequired,
      workCount: PropTypes.number.isRequired,
      services: PropTypes.arrayOf(
        PropTypes.shape({
          affiliationName: PropTypes.string.isRequired,
          workType: PropTypes.string.isRequired,
          serviceDate: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  year: PropTypes.string,
  month: PropTypes.string,
};

const ExportPDFEM = ({ data, year, month }) => {
  return (
    <PDFDownloadLink
      className="px-2 py-1 bg-indigo-800 text-white rounded-sm text-xs md:text-sm xl:text-sm hover:bg-indigo-900 inline-flex gap-2 items-center"
      document={<PDFContentEM data={data} year={year} month={month} />}
      fileName="detailsEmployee.pdf"
    >
      <FaFilePdf /> Export to PDF
    </PDFDownloadLink>
  );
};
ExportPDFEM.propTypes = {
  data: PropTypes.array.isRequired,
  year: PropTypes.string,
  month: PropTypes.string,
};
export default ExportPDFEM;
