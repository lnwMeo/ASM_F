import { useState, useEffect } from "react";
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
import PropTypes from "prop-types";
import wt from "../../assets/images/LOGO.png";
import logopdf from "../../assets/images/logopdf.png";
// ✅ โหลดฟอนต์ไทย
Font.register({
  family: "Noto Sans Thai",
  src: "/fonts/NotoSansThai-VariableFont_wdth,wght.ttf",
});

// ✅ ตั้งค่าการแสดงผล PDF
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

// ✅ ฟังก์ชันแปลงรูปเป็น Base64
const convertImageToBase64 = async (url) => {
  try {
    console.log("🔄 กำลังโหลดรูปจาก Proxy:", url);

    if (!url) {
      console.error("❌ URL รูปภาพเป็น `null` หรือ `undefined`");
      return null;
    }

    const proxyUrl = `https://niaassessmentb.nrru.ac.th/proxy-image?url=${encodeURIComponent(
      url
    )}`;
    // console.log("🛰 Proxy URL ที่ใช้:", proxyUrl);

    const response = await fetch(proxyUrl, { cache: "no-cache" });
    if (!response.ok)
      throw new Error(`❌ โหลดรูปไม่สำเร็จ: ${response.status}`);

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("✅ แปลง Base64 สำเร็จ:", reader.result.substring(0, 50)); // Log Base64
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // ✅ ใช้ Base64
    });
  } catch (error) {
    console.error("❌ Error converting image:", error);
    return null;
  }
};

// ✅ เนื้อหา PDF
const PDFContent = ({ data, imageBase64 }) => {
  if (!data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.boldText}>❌ ไม่พบข้อมูล</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ลายน้ำ */}
        <View style={styles.watermarkContainer}>
          <Image src={wt} style={styles.watermark} />
        </View>

        {/* ข้อมูล */}
        <View key={data.id} style={styles.section}>
          <View style={styles.sectionhandder}>
            <Image src={logopdf} style={styles.logopd} />
            <View>
              <Text style={styles.boldText}>รายละเอียดข้อมูลการให้บริการ</Text>
              <Text style={styles.boldText}>วันที่ : {data.serviceDate} </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.boldText}>ผู้รับบริการ</Text>
            <Text>คำนำหน้า : {data.statusrecipient?.statusrecipientname || "ไม่ระบุ"} </Text>
            <Text>ผู้รับบริการ : {data.servicerecipient || "ไม่ระบุ"} </Text>
            <Text>สังกัด : {data.affiliation?.affiliationname || "ไม่ระบุ"} </Text>
          </View>

          {/* รายละเอียดผู้ให้บริการ */}
          <View style={styles.section}>
            <Text style={styles.boldText}>ผู้ให้บริการ</Text>
            <Text>กลุ่มงาน : {data.groupwork?.GroupWorkname || "ไม่ระบุ"} </Text>
            <View>
              <Text>
                เจ้าหน้าที่ : {data.ServiceWorkEmployee?.map(
                  (employee) => employee.employee?.Employeename
                ).join(" , ") || "ไม่ระบุ"}
              </Text>
            </View>
            <Text>ประเภทงาน : {data.worktype?.WorkTypename || "ไม่ระบุ"} </Text>
          </View>

          {/* งบประมาณ */}
          <View style={styles.section}>
            <Text style={styles.boldText}>รายการค่าวัสดุอุปกรณ์</Text>
            {data.servicebudget?.length ? (
              data.servicebudget.map((budget) => (
                <View key={budget.id} style={styles.tableRow}>
                  <Text style={styles.tableColumn}>{budget.ServiceBudgetname}</Text>
                  <Text style={styles.tableColumn}>{budget.Amount} บาท</Text>
                </View>
              ))
            ) : (
              <Text>❌ ไม่มีข้อมูลงบประมาณ</Text>
            )}
            <Text style={[styles.boldText, { textAlign: "right" }]}>
              ยอดรวม : {data.totalAmount || 0} บาท
            </Text>
          </View>

          {/* รูปประกอบ */}
          <Text style={styles.boldText}>รูปประกอบ</Text>
          <View style={[styles.section, { alignItems: "center" }]}>
            {imageBase64 ? (
              <Image src={imageBase64} style={styles.imageds} />
            ) : (
              <Text>❌ ไม่พบรูป</Text>
            )}
          </View>

          {/* รายละเอียดเพิ่มเติม */}
          <View style={styles.section}>
            <Text style={styles.boldText}>รายละเอียดของงาน (พอสังเขป)</Text>
            <Text>{data.description || "ไม่ได้ระบุ"} </Text>
          </View>

          {/* คะแนนความพึงพอใจ */}
          <View style={styles.section}>
            <Text style={styles.boldText}>คะแนนความพึงพอใจ</Text>
            {data.servicerating?.length ? (
              data.servicerating.map((rating) => (
                <View key={rating.id} style={styles.tableRow}>
                  <Text style={styles.tableColumn}>{rating.questionrating?.questionname}</Text>
                  <Text style={styles.tableColumn}>{rating.score} คะแนน</Text>
                </View>
              ))
            ) : (
              <Text>❌ ไม่มีข้อมูลคะแนน</Text>
            )}
          </View>

          {/* การยืนยัน */}
          <View style={[styles.section, { textAlign: "right", marginTop: 8 }]}>
            {data.statusconfirm && (
              <View>
                <Text>ผู้รับรอง : {data.confirmbyname?.name || "ไม่ระบุ"} </Text>
                <Text>ตำแหน่ง : {data.confirmbyname?.rank || "ไม่ระบุ"} </Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};


// ✅ ปุ่ม Export PDF
const ExportPDFButton = ({ data, imageUrl }) => {
  const [imageBase64, setImageBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      // console.warn("⚠️ ไม่มี URL รูปภาพ");
      setIsLoading(false);
      return;
    }

    console.log("📷 กำลังโหลดรูปจาก URL:", imageUrl);

    convertImageToBase64(imageUrl).then((base64) => {
      if (base64) {
        console.log("✅ Base64 สร้างสำเร็จ:", base64.substring(0, 50));
        setImageBase64(base64);
      } else {
        console.error("❌ สร้าง Base64 ไม่สำเร็จ");
      }
      setIsLoading(false);
    });
  }, [imageUrl]);

  if (isLoading) return <p>⏳ กำลังโหลด PDF...</p>;

  return (
    <PDFDownloadLink
      className="p-2 bg-indigo-800 text-white rounded-sm text-sm hover:bg-indigo-900 inline-flex gap-2 items-center"
      document={<PDFContent data={data} imageBase64={imageBase64} />}
      fileName="service-details.pdf"
    >
      <FaFilePdf /> Export to PDF
    </PDFDownloadLink>
  );
};

ExportPDFButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    serviceDate: PropTypes.string.isRequired,
  }).isRequired,
  imageUrl: PropTypes.string, // ✅ แยก `imageUrl` ออกมา
};

PDFContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    serviceDate: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

ExportPDFButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default ExportPDFButton;
