import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Platform } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import ButtonComp from "../../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreateSuratComp({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dated, setDate] = useState(new Date());
  const [invoice, setInvoice] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const [surat, setSurat] = useState({
    nospk: "",
    judul: "",
    penerima: "",
    tembusan: "",
    alamattemb: "",
    telptemb: "",
    alamat: "",
    kota: "",
    tanggal: "",
    harga: "",
    hargaterbilang: "",
    estimasi: "",
    pembayaran: "",
    lain: "",
    pemberi: "",
  });

  const onChangeNoSpk = (value) => {
    setSurat({ ...surat, nospk: value });
  };

  const onChangeJudul = (value) => {
    setSurat({ ...surat, judul: value });
  };

  const onChangePenerima = (value) => {
    setSurat({ ...surat, penerima: value });
  };

  const onChangeTembusan = (value) => {
    setSurat({ ...surat, tembusan: value });
  };

  const onChangeAlamattemb = (value) => {
    setSurat({ ...surat, alamattemb: value });
  };

  const onChangeTelptemb = (value) => {
    setSurat({ ...surat, telptemb: value });
  };

  const onChangeAlamat = (value) => {
    setSurat({ ...surat, alamat: value });
  };

  const onChangeKota = (value) => {
    setSurat({ ...surat, kota: value });
  };

  const onChangeEstimasti = (value) => {
    setSurat({ ...surat, estimasi: value });
  };

  const onChangePembayaran = (value) => {
    setSurat({ ...surat, pembayaran: value });
  };

  const onChangeLain = (value) => {
    setSurat({ ...surat, lain: value });
  };

  const onChangePemberi = (value) => {
    setSurat({ ...surat, pemberi: value });
  };

  const url = "https://nodejsspk.herokuapp.com";

  useEffect(() => {
    (async () =>
      await axios.get(url + "/laporan/number").then((e) => {
        setInvoice(e.data.data);
      }))();
  }, []);

  const onSubmitHandle = async () => {
    try {
      await axios
        .post(`${url}/laporan`, {
          nospk: invoice,
          judul: surat.judul,
          penerima: surat.penerima,
          tembusan: surat.tembusan,
          alamattemb: surat.alamattemb,
          telptemb: surat.telptemb,
          alamat: surat.alamat,
          kota: surat.kota,
          tanggal: dated,
          harga: parseInt(surat.harga),
          hargaterbilang: surat.hargaterbilang,
          estimasi: surat.estimasi,
          pembayaran: surat.pembayaran,
          lain: surat.lain,
          pemberi: surat.pemberi,
        })
        .then((e) => AsyncStorage.setItem("id", String(e.data.laporanbaru.id)));

      navigation.navigate("Uraian Pekerjaan");
    } catch {
      (e) => console.error(`Error: ${e}`);
    }
  };

  console.log(invoice);

  return (
    <TailwindProvider>
      <ScrollView>
        <View style={styles.container} className="justify-between pl-4 pr-2 pt-4 pb-2">
          <Text style={styles.input}>No. SPK</Text>
          <TextInput placeholder="No. SPK" className=" bg-white rounded-md w-2/4 pl-4 py-1" value={invoice} />
        </View>

        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Judul Proyek</Text>
          <TextInput placeholder="Judul Proyek" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeJudul(value)} />
        </View>

        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Penerima Tugas</Text>
          <TextInput placeholder="Penerima Tugas" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangePenerima(value)} />
        </View>

        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Tembusan</Text>
          <TextInput placeholder="Tembusan" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeTembusan(value)} />
        </View>

        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Alamat Tembusan</Text>
          <TextInput placeholder="Alamat Tembusan" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeAlamattemb(value)} />
        </View>
        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Telepon Tembusan</Text>
          <TextInput placeholder="Telepon Tembusan" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeTelptemb(value)} />
        </View>

        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Alamat Proyek</Text>
          <TextInput placeholder="Alamat Proyek" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeAlamat(value)} />
        </View>
        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Kota</Text>
          <TextInput placeholder="Kota" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeKota(value)} />
        </View>

        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Tanggal</Text>
          <View style={{ flexDirection: "row" }} className="w-2/4">
            <ButtonComp icox="calendar" onPress={showDatePicker} classNa=" bg-orange-500 rounded-sm px-1 py-0 text-lg mr-1" />
            <Text className="bg-white rounded-md w-40 pl-4 py-1">{dated ? dated.toLocaleDateString() : "No date selected"}</Text>
          </View>
        </View>

        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Estimasi Pekerjaan</Text>
          <TextInput placeholder="Estimasi Pekerjaan" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeEstimasti(value)} />
        </View>

        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Terms Pembayaran</Text>
          <TextInput placeholder="Pembayaran" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangePembayaran(value)} />
        </View>
        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Lain - Lain</Text>
          <TextInput placeholder="Lain - Lain" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeLain(value)} />
        </View>
        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Pemberi Tugas</Text>
          <TextInput placeholder="Pemberi Tugas" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangePemberi(value)} />
        </View>

        <View>
          <DateTimePickerModal date={new Date()} isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
        </View>
      </ScrollView>
      <ButtonComp title="LANJUT" classNa="bg-orange-500 py-4 active:bg-orange-700 rounded-none" onPress={onSubmitHandle} />
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: {
    height: 30,
    lineHeight: 30,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
