import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Image, ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import "./preview.css";
import sign from "../assets/sign.png";


interface PreviewData {
  recipientName: string;
  senderName: string;
  letterDate: string;
  birthDate: string;
  address: string;
}

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);

  const data = location.state as PreviewData;

  useEffect(() => {
    if (!data || !data.recipientName || !data.letterDate || !data.birthDate || !data.address) {
      navigate("/");
    }
  }, [data, navigate]);

  if (!data) return null;

  const convertToGujaratiDate = (dateString: string) => {
    const gujaratiNumbers = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];

    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate.replace(/\d/g, (digit) => gujaratiNumbers[parseInt(digit)]);
  };

  const downloadPDF = async () => {
    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`birthday-wishes-${data.recipientName}.pdf`);
  };

  const downloadImage = async () => {
    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `birthday-wishes-${data.recipientName}.png`);
      }
    });
  };

  const convertBirthDateToGujaratiFormat = (dateString: string) => {
    const gujaratiNumbers = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];

    const monthNamesGujarati = [
      'જાન્યુઆરી',
      'ફેબ્રુઆરી',
      'માર્ચ',
      'એપ્રિલ',
      'મે',
      'જૂન',
      'જુલાઈ',
      'ઓગસ્ટ',
      'સપ્ટેમ્બર',
      'ઓક્ટોમ્બર',
      'નવેમ્બર',
      'ડિસેમ્બર'
    ];

    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const monthName = monthNamesGujarati[dateObj.getMonth()];

    const gujaratiDay = day.replace(/\d/g, (digit) => gujaratiNumbers[parseInt(digit)]);

    return `${monthName} મહીનાની ${gujaratiDay}`;
  };

  console.log("data.address", data.address)

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Button>

          <div className="flex gap-4">
            <Button onClick={downloadPDF} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={downloadImage} variant="outline" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Download Image
            </Button>
          </div>
        </div>

        <Card className="max-w-3xl  mx-auto shadow-2xl border bg-white ">
          <div ref={printRef} className="print-area">
            <p className="text-right mb-10">તા. {convertToGujaratiDate(data.letterDate)}</p>

            <p className="text-center font-bold text-red-600 mb-10">।। जीवेत शરदः शतम् ।।</p>

            <p className="mb-6">સ્નેહીશ્રી, {data.recipientName}</p>

            <p className="mb-2 content">
               {convertBirthDateToGujaratiFormat(data.birthDate)} તારીખે આવતા આપના જન્મદિવસ નિમિત્તે હાર્દિક શુભેચ્છાઓ...
            </p>

            <p className="mb-2 content">
              
              જન્મદિવસ એ જીવનમાં નવી ઉર્જા, આશા અને સંકલ્પ લઈને આવે છે. આ નવા વર્ષ
              આપના માટે નવી શક્તિ, નવી પ્રેરણા અને નવી સફળતાઓ લઈને આવે તેવી અભિલાષા
              તથા જીવનના દરેક ક્ષેત્રમાં આપની ગતિ થતી રહે અને જીવનમાં આવતી દરેક પળો
              આનંદમય, મંગલમય તેમજ યશસ્વીમય બની રહે તેવી શુભેચ્છાઓ પાઠવું છું.
            </p>

            <p className="mb-2 content">
              
              આજની પેઢી અને સમાજ માટે તમે વધુ ઉપયોગી થશો, વધુ સેવાકાર્ય કરશો અને લોકોને
              પ્રેરણા આપતા રહેશો એવી આશા સાથે..
            </p>

            <p className=" mb-3 content">
              
              જન્મદિનની પુનઃ હાર્દિક શુભકામનાઓ...
            </p>

            <div className="block ">
              <img className="ml-auto" src={sign} alt="" />
            </div>

           
              <div className="mt-2 mb-2 text-[15px] leading-[1.8]">
                <span>પ્રતિ,</span><br />
                <span>શ્રી {data.recipientName || "તમારો મિત્ર"}</span><br />
                {data.address.split(',').map((part, index) => (
                  <div key={index}>{part.trim()},</div>
                ))}
              </div>
          


          </div>

        </Card>
      </div>
    </div>
  );
};

export default Preview;
