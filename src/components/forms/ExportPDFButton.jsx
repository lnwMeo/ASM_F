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
import wt from "../../assets/images/LOGO.png";
// import ds from "../../assets/images/1.jpg";
import logopdf from "../../assets/images/logopdf.png";
Font.register({
  family: "Noto Sans Thai",
  src: "/fonts/NotoSansThai-VariableFont_wdth,wght.ttf",
});
import PropTypes from "prop-types";
// สไตล์สำหรับ PDF
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
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableColumn: {
    justifyContent: "space-between",
  },
  sectionhandder: {
    display: "flex",
    flexDirection: "row", // จัดเรียงในแนวนอน
    justifyContent: "space-between", // เว้นช่องว่างระหว่างองค์ประกอบ
    alignItems: "center", // จัดกึ่งกลางแนวตั้ง
    marginBottom: 10,
  },
});

// เนื้อหา PDF
const PDFContent = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* ลายน้ำ */}
      <View style={styles.watermarkContainer}>
        <Image
          src={wt} // ใส่ URL หรือ Path ของรูปภาพ
          style={styles.watermark}
        />
      </View>
      {/* ข้อมูล */}
      {data?.map((item) => (
        <View key={item.id} style={styles.section}>
          <View style={styles.sectionhandder}>
            <Image
              src={logopdf} // ใส่ URL หรือ Path ของรูปภาพ
              style={styles.logopd}
            />
            <View>
              <Text style={styles.boldText}>รายละเอียดข้อมูลการให้บริการ</Text>
              <Text style={styles.boldText}>วันที่ : {item.serviceDate} </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.boldText}>ผู้รับบริการ</Text>
            <Text>คำนำหน้า : {item.statusrecipient?.statusrecipientname} </Text>
            <Text>ผู้รับบริการ : {item.servicerecipient} </Text>
            <Text>สังกัด : {item.affiliation?.affiliationname} </Text>
          </View>

          {/* รายละเอียดผู้ให้บริการ */}
          <View style={styles.section}>
            <Text style={styles.boldText}>ผู้ให้บริการ</Text>
            <Text>กลุ่มงาน : {item.groupwork?.GroupWorkname} </Text>
            <View>
              <Text>
                เจ้าหน้าที่ :{" "}
                {item.ServiceWorkEmployee.map(
                  (employee) => employee.employee?.Employeename
                ).join(" , ")}
              </Text>
            </View>
            <Text>ประเภทงาน : {item.worktype?.WorkTypename} </Text>
          </View>

          {/* งบประมาณ */}
          <View style={styles.section}>
            <Text style={styles.boldText}>งบประมาณการให้บริการ</Text>
            {item.servicebudget.map((budget) => (
              <View key={budget.id} style={styles.tableRow}>
                <Text style={styles.tableColumn}>
                  {budget.ServiceBudgetname}
                </Text>
                <Text style={styles.tableColumn}>{budget.Amount} บาท</Text>
              </View>
            ))}
            <Text style={[styles.boldText, { textAlign: "right" }]}>
              ยอดรวม : {item.totalAmount} บาท
            </Text>
          </View>

          {/* รายละเอียดเพิ่มเติม */}
          <Text style={styles.boldText}>รูปประกอบ</Text>
          <View style={[styles.section, { alignItems: "center" }]}>
            <Image
              src={`http://localhost:5000/${item?.image}`}
              // src={ds} // ใส่ URL หรือ Path ของรูปภาพ
              style={styles.imageds}
            />
          </View>

          {/* รายละเอียดเพิ่มเติม */}
          <View style={styles.section}>
            <Text style={styles.boldText}>รายละเอียด</Text>
            <Text>{item.description || "ไม่ได้ระบุ"} </Text>
          </View>

          {/* คะแนนความพึงพอใจ */}
          <View style={styles.section}>
            <Text style={styles.boldText}>คะแนนความพึงพอใจ</Text>
            {item.servicerating.map((rating) => (
              <View key={rating.id} style={styles.tableRow}>
                <Text style={styles.tableColumn}>
                  {rating.questionrating?.questionname}
                </Text>
                <Text style={styles.tableColumn}>{rating.score} คะแนน</Text>
              </View>
            ))}
          </View>

          {/* การยืนยัน */}
          <View style={[styles.section, { textAlign: "right", marginTop: 8 }]}>
            {item.statusconfirm && (
              <View>
                <Text>ผู้รับรอง : {item.confirmbyname?.name} </Text>
                <Text>ตำแหน่ง : {item.confirmbyname?.rank} </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);
PDFContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

      // เพิ่ม field อื่น ๆ ของ item ตามที่คุณใช้
    })
  ).isRequired,
};

// ปุ่ม ExportPDF
const ExportPDFButton = ({ data }) => {
  if (!data) {
    return null; // ตรวจสอบว่ามีข้อมูลหรือไม่
  }
  // เพิ่ม propTypes สำหรับ ExportPDFButton
  ExportPDFButton.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        // เพิ่ม field อื่น ๆ ของ item ตามที่คุณใช้
      })
    ).isRequired,
  };
  return (
    <PDFDownloadLink
      className="p-2 bg-indigo-800 text-white rounded-sm text-sm md:text-sm xl:text-sm hover:bg-indigo-900 inline-flex gap-2 items-center"
      document={<PDFContent data={data} />}
      fileName="service-details.pdf"
    >
      <FaFilePdf /> Export to PDF
    </PDFDownloadLink>
  );
};

export default ExportPDFButton;
