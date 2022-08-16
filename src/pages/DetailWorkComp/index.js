import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, Drop } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import ButtonComp from "../../components/Button";
import { DataTable } from "react-native-paper";
const convertRupiah = require("rupiah-format");
const angkaTerbilang = require("@develoka/angka-terbilang-js");

import { Picker } from "@react-native-picker/picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import * as Print from "expo-print";

export default function DetailWorkComp({ navigation }) {
  const url = "https://nodejsspk.herokuapp.com";

  const tipe = ["Jasa", "Item"];

  const [totalsatuan, setTotalSatuan] = useState(false);
  const [laporan, setLaporan] = useState([]);

  const [detail, setDetail] = useState({
    detail: "",
    tipe: "",
    jumlah: "",
    satuan: "",
    harga: "",
    LaporanId: "",
    total: "",
  });

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("id").then((e) => setDetail({ LaporanId: parseInt(e) }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await axios.get(url + "/laporan/" + detail.LaporanId).then((e) => setLaporan(e.data.data));
    })();
  }, [detail.LaporanId]);

  console.log(laporan);

  useEffect(() => {
    setDetail({ ...detail, total: detail.jumlah * detail.harga });
    setTotalSatuan(false);
  }, [totalsatuan]);

  const [data, setData] = useState([]);

  const tambahdata = async () => {
    setDetail({ ...detail, total: detail.jumlah * detail.harga });
    setData([...data, detail]);
  };

  const onChangeDetail = (value) => {
    // setDetail({ ...detail, harga: value });
    setDetail({ ...detail, detail: value });
  };

  const onChangeJumlah = (value) => {
    // setDetail({ ...detail, harga: value });
    setDetail({ ...detail, jumlah: value });
  };

  const onChangeSatuan = (value) => {
    // setDetail({ ...detail, harga: value });
    setDetail({ ...detail, satuan: value });
  };

  const onChangeHarga = (value) => {
    setDetail({ ...detail, harga: value });
    setTotalSatuan(true);
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const ubahTanggal = (value) => {
    const date = new Date(value);
    const day = date.getDate();
    let month = date.getMonth();
    month = month + 1;
    if (String(day).length == 1) day = "0" + day;
    if (String(month).length == 1) month = "0" + month;

    const dateT = day + "-" + month + "-" + date.getFullYear();

    return dateT;
  };

  console.log(data);
  console.log(detail);

  const [tes, setTes] = useState({
    nospk: "Q01-01/SPK/361/BBO/VIII/1",
    judul: "Pembersihan Toilet",
    alamat: "Jalan Badung Tanggerang",
    penerima: "pak karta",
    tembusan: "pak siswanto",
    alamattemb: "jalan keroobokan badung",
    telptemb: "089696485152",
    kota: "denpasar",
    tanggal: "15/08/2022",
    estimasi: "1 minggu",
    termspembayaran: "dibuat satu kali",
    lain: "asdsadasdasd",
    pemberi: "iskandar muda",
  });

  const generateHTML = (value) =>
    `<html>
    <head>
      <title>KOP SURAT</title>
    </head>
    <body style="width: 21cm; height: 29.7cm">
      <div style="border-bottom: 2px solid black; position: relative">
        <div style="padding: 2; margin: 2; position: absolute; top: 10">
          <img
            src="data:image/png;base64,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qOv1n+Mn7M/gj41QvNq1h9h1rbhNXsAI7gem/jEg9mB9iK+CfjT+yH43+D/n3y2//CReHkyf7T0+Mkxr6yx8lPryv+1XzGIwFWhqtUfv+R8Z5dnFqU37Oq/sy2fo9n6aPyPDqfDM9vMksTtHKhDK6HBUjoQexptJXmn32jVmdL4u+JXirx5DZReIvEGoazFZoI4EvJ2cIB3wererHk9zXNUUU3Jyd27mdKjToR5KUVFdkrIKK2fCfg3XPHetQ6T4f0u51bUJfuw2sZYgf3mPRVHcnAFfanwV/wCCfdrZfZ9U+I12LyfhxoljIREvtLKOW+iYHH3jXTQwtXEP3Fp36HhZvxBl+SQ5sXU97pFayfy/V2XmfJPww+DPi74wap9j8M6RLdorBZryT5LeD3eQ8D6DJPYGvuv4K/sL+E/AP2fUvFRj8Wa4uG8uVMWULf7MZ/1n1fj/AGRX0boeg6d4Z0uDTdJsbfTdPt12xW1rEI40Hso4q/X0uHy6lR96fvM/Ac844x+aXpYb91T7J+8/V/orfMbHGkMaxxqqIo2qqjAAHQAU6iivWPzcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkIyMEZFLRQB87/ABq/Yp8GfFDz9R0dF8KeIHy3n2cY+zTN/wBNIuBz/eXB5yc18G/Fr4B+M/gxfGPxDpbCxZtsWp2uZLWX0w+OD/stg+1fr1VbUdNtNYsZrK/tYb2zmUpLb3EYeN1PUMp4Iry8Rl9Kt7y0Z+iZHxtmOU2pVn7Wkuj3XpLf5O6PxRsbG51S8htLO3lu7qZgkUECF3dj0CqOSfYV9YfBX9gPXfE3kan49nk8O6acMNNgKteSj0Y8rF+OW9hX2d4D+CHgT4Z311e+GfDNnpd5csWkuFDSSDPVVZySi/7K4HtXc1zYfK4Q96s7v8D3s68RMRiY+yyyPs4v7Ts5fJbL11focx4B+Gvhn4YaMul+GdIt9KteN5iXMkpH8Tufmc+5NdPRRXuKKirJH5FVq1K03UqycpPdvVsKKKKZkFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k="
            style="height: 80"
          />
        </div>
        <div style="padding: 10; margin: 2; text-align: center">
          <h5 style="margin: 16; font-size: x-small">SURAT PERINTAH KERJA</h5>
          <h5 style="margin: 2; padding: 0; font-size: x-small">No : ${laporan.nospk}</h5>
          <h5 style="margin: 2; padding: 0; font-size: x-small">Proyek : ${laporan.judul}</h5>
          <h5 style="margin: 2; padding: 0; font-size: x-small">Alamat : ${laporan.alamat}</h5>
        </div>
      </div>
      <p style="font-size: x-small">Bali, Tuesday, October 1, 2019</p>
      <div style="display: flex; justify-content: space-between">
        <div>
          <tr>
            <td colspan="2">
              <table border="0" cellpadding="1" style="width: 200px">
                <tbody>
                  <tr>
                    <td width="93"><span style="font-size: x-small">Kepada</span></td>
                    <td width="8"><span style="font-size: x-small">:</span></td>
                    <td width="200"><span style="font-size: x-small; font-weight: bold;">${laporan.tembusan}</span></td>
                  </tr>
                  <tr>
                    <td><span style="font-size: x-small">Up.</span></td>
                    <td><span style="font-size: x-small">:</span></td>
                    <td><span style="font-size: x-small; font-weight: bold;">${laporan.tembusan}</span></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </div>
        <div>
          <tr>
            <td colspan="2">
              <table border="0" cellpadding="1" style="width: 200px">
                <tbody>
                  <tr>
                    <td width="93"><span style="font-size: x-small">Alamat</span></td>
                    <td width="8"><span style="font-size: x-small">:</span></td>
                    <td width="200"><span style="font-size: x-small">${laporan.alamat}</span></td>
                  </tr>
                  <tr>
                    <td><span style="font-size: x-small">Kota</span></td>
                    <td><span style="font-size: x-small">:</span></td>
                    <td><span style="font-size: x-small">${laporan.kota}</span></td>
                  </tr>
                  <tr>
                    <td><span style="font-size: x-small">Telp</span></td>
                    <td><span style="font-size: x-small">:</span></td>
                    <td><span style="font-size: x-small">${laporan.telptemb}</span></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </div>
      </div>
      <p style="font-size: x-small; margin-top: 2; margin-bottom: 2; margin-bottom: 5;">Hormat Kami,</p>
      <p style="font-size: x-small; margin-top: 2; margin-bottom: 2; text-align: justify; margin-bottom: 10;">
        Menunjuk penawaran dari ${laporan.penerima} terkait pekerjaan ${laporan.judul}, bersama ini kami menugaskan ${laporan.penerima}, berdomisili di ${laporan.kota}, untuk melaksanakan Pekerjaan ${laporan.judul},
        yang berlokasi di ${laporan.alamat}.
      </p>
      <div>
        <tr>
          <td colspan="2">
            <table border="0" cellpadding="1" style="width: 21cm">
              <tbody>
                <tr>
                  <td style="padding-top: 3;" width="10"><span style="font-size: x-small; font-weight: bold">A.</span></td>
                  <td style="padding-top: 3;"><span style="font-size: x-small; font-weight: bold">Harga Kontrak :</span></td>
                </tr>
                <tr>
                  <td width="10"><span style="font-size: x-small; font-weight: bold"></span></td>
                  <td colspan="2" width="200"><span style="font-size: x-small">Harga ${laporan.judul} di ${laporan.alamat} adalah dengan total nilai ${convertRupiah.convert(
      data.reduce((sum, i) => (sum += i.jumlah * i.harga), 0)
    )},- (${toTitleCase(angkaTerbilang(data.reduce((sum, i) => (sum += i.jumlah * i.harga), 0)))} Rupiah)</span></td>
                </tr>
                <tr>
                  <td style="padding-top: 3;" width="10"><span style="font-size: x-small; font-weight: bold">B.</span></td>
                  <td style="padding-top: 3;"><span style="font-size: x-small; font-weight: bold">Spesifikasi Pekerjaan :</span></td>
                </tr>
                <tr>
                  <td width="10"><span style="font-size: x-small; font-weight: bold"></span></td>
                  <td colspan="2" width="200" style="padding-top: 3">
                    <span style="font-size: x-small">Pelaksanaan Pekerjaan ${laporan.judul} di ${laporan.alamat}  adalah sesuai dengan penawaran dari Penerima Tugas dengan spesifikasi sebagai berikut :</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </div>
  
      <table style="width: 21cm; font-size: x-small; margin-bottom: 10px; margin-bottom: 10px;border: 1px solid black;border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid black;border-collapse: collapse;">No</th>
          <th style="border: 1px solid black;border-collapse: collapse;text-align: left; padding-left: 5;">Uraian Spesifikasi / Detail</th>
          <th style="border: 1px solid black;border-collapse: collapse;">Jenis</th>
          <th style="border: 1px solid black;border-collapse: collapse;">Jumlah</th>
          <th style="border: 1px solid black;border-collapse: collapse;">Satuan</th>
          <th style="border: 1px solid black;border-collapse: collapse;text-align: left; padding-left: 5;">Harga Satuan</th>
          <th style="border: 1px solid black;border-collapse: collapse;text-align: left; padding-left: 5;">Total Harga</th>
        </tr>
        ${data.map((e, i) => {
          return `<tr>
            <td style="border: 1px solid black;border-collapse: collapse; text-align: center;">${i + 1}</td>
            <td style="border: 1px solid black;border-collapse: collapse; padding-left: 5;">${e.detail}</td>
            <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">${e.tipe}</td>
            <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">${e.jumlah}</td>
            <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">${e.satuan}</td>
            <td style="border: 1px solid black;border-collapse: collapse;padding-left: 5;">${convertRupiah.convert(e.harga)}</td>
            <td style="border: 1px solid black;border-collapse: collapse;padding-left: 5;">${convertRupiah.convert(e.total)}</td>
          </tr>`;
        })}
        <tr>
          <td colspan="6" style="border: 1px solid black;border-collapse: collapse; text-align: center;">total</td>
          <td style="border: 1px solid black;border-collapse: collapse;padding-left: 5;">${convertRupiah.convert(data.reduce((sum, i) => (sum += i.jumlah * i.harga), 0))}</td>
        </tr>
      </table>
  
      <div>
        <tr>
          <td colspan="2">
            <table border="0" cellpadding="1" style="width: 21cm">
              <tbody>
                <tr>
                  <td style="padding-top: 3;" width="10" ><span style="font-size: x-small; font-weight: bold">C.</span></td>
                  <td style="padding-top: 3;"><span style="font-size: x-small; font-weight: bold">Waktu Pelaksanaan :</span></td>
                </tr>
                <tr>
                  <td width="10"><span style="font-size: x-small; font-weight: bold"></span></td>
                  <td colspan="2" width="200" style="padding-top: 3">
                    <span style="font-size: x-small; text-align: justify;"
                      >Pelaksanaan Pekerjaan terhitung sejak SPK ditandatangani oleh kedua belah pihak dan lama pengerjaan terhitung ${laporan.estimasi}. ${laporan.judul} di ${
      laporan.alamat
    }  harus selesai 100% (Seratus Persen) dan diserah terimakan dengan
                      baik kepada Pemberi Tugas.</span
                    >
                  </td>
                </tr>
                <tr>
                  <td width="10"><span style="font-size: x-small; font-weight: bold">D.</span></td>
                  <td style="padding-top:3"><span style="font-size: x-small; font-weight: bold">Penerima Tugas akan memenuhi ketentuan-ketentuan berikut :</span></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </div>
  
      <ol style="margin: 0; text-align: justify">
        <li style="position: relative; left: -12px; font-size: x-small; padding-top: 3;">Sanggup dan bertanggung jawab untuk melaksanakan, menyelesaikan dan memelihara pekerjaan sesuai dengan ketentuan yang ada di dalam surat penawaran dan SPK.</li>
        <li style="position: relative; left: -12px; font-size: x-small; padding-top: 3;">
          Harga satuan kontrak adalah Lump Sum Fixed Price dalam mata uang Rupiah (Rp.), tidak akan berubah karena kenaikan harga bahan/peralatan, upah, jasa, transport, tarif listrik, BBM, dan fluktuasi nilai mata uang rupiah terhadap mata
          uang asing kecuali kebijakan baru pemerintah dalam bidang moneter.
        </li>
        <li style="position: relative; left: -12px; font-size: x-small; padding-top: 3;">Sanggup menyediaakan dan menempatkan tenaga-tenaga yang trampil dan berpengalaman.</li>
        <li style="position: relative; left: -12px; font-size: x-small; padding-top: 3;">
          Bertanggung jawab sepenuhnya terhadap keselamatan, kesehatan, keamanan dan kenyamanan personil-personil dan crew-crew Penerima Tugas, segala resiko yang timbul akibat dari kelalaian Penerima Tugas dalam melaksanakan ketentuan ini
          ditanggung sepenuhnya oleh Penerima Tugas.
        </li>
        <li style="position: relative; left: -12px; font-size: x-small; padding-top: 3;">
          Tidak akan menimbulkan gangguan selama Penerima Tugas melaksanakan kewajibannya, segala resiko akibat dari kelalaian Penerima Tugas dalam melaksanakan ketentuan ini ditanggung sepenuhnya oleh Penerima Tugas.
        </li>
      </ol>
  
  
  
      <div>
        <tr>
          <td colspan="2">
            <table border="0" cellpadding="1" style="width: 21cm">
              <tbody>
                <tr>
                  <td style="padding-top: 3" width="10"><span style="font-size: x-small; font-weight: bold">E.</span></td>
                  <td style="padding-top: 3"><span style="font-size: x-small; font-weight: bold">Sistem Pembayaran :</span></td>
                </tr>
                <tr>
                  <td width="10"><span style="font-size: x-small; font-weight: bold"></span></td>
                  <td style="padding-top: 3" colspan="2" width="200"><span style="font-size: x-small">${laporan.pembayaran}</span></td>
                </tr>
                <tr>
                  <td style="padding-top: 3" width="10"><span style="font-size: x-small; font-weight: bold">F.</span></td>
                  <td style="padding-top: 3"><span style="font-size: x-small; font-weight: bold">Lain - lain :</span></td>
                </tr>
                <tr>
                <td width="10"><span style="font-size: x-small; font-weight: bold"></span></td>
                <td style="padding-top: 3" colspan="2" width="200"><span style="font-size: x-small">${laporan.lain}</span></td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </div>
  
      <p style="font-size: x-small; margin-top: 2; margin-bottom: 2; text-align: justify;margin-top: 10;">
        Menunjuk ${laporan.penerima} terkait pekerjaan ${laporan.judul}, bersama ini kami menugaskan ${laporan.penerima}, berdomisili di ${laporan.kota}, untuk melaksanakan Pekerjaan ${laporan.judul},
        yang berlokasi di ${laporan.alamat}.
      </p>
  
      <p style="font-size: x-small; margin-top: 2; margin-bottom: 2; text-align: justify;margin-top: 10;">Dengan ini menyatakan telah memerika dan menerima Surat Perintah Kerja</p>
  
      <div>
          <tr>
            <td colspan="2">
              <table border="0" cellpadding="1" style="width: 21cm; text-align: center;">
                <tbody>
                  <tr>
                    <td width="200"><span style="font-size: x-small"></span></td>
                    <td width="600"><span style="font-size: x-small"></span></td>
                    <td width="200"><span style="font-size: x-small;font-weight: bold;">Bali, ${ubahTanggal(laporan.tanggal)}</span></td>
                  </tr>
                  <tr>
                    <td width="200"><span style="font-size: x-small">Pemberi Tugas</span></td>
                    <td width="600"><span style="font-size: x-small"></span></td>
                    <td width="200"><span style="font-size: x-small;">Penerima Tugas</span></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </div>
  
  
        <div style="margin-top: 50;">
          <tr>
            <td colspan="2">
              <table border="0" cellpadding="1" style="width: 21cm; text-align: center;">
                <tbody>
                  <tr>
                    <td width="200"><span style="font-size: x-small; font-weight: bold;">${laporan.pemberi}</span></td>
                    <td width="600"><span style="font-size: x-small"></span></td>
                    <td width="200"><span style="font-size: x-small; font-weight: bold;">${laporan.penerima}</span></td>
                  </tr>
  
                </tbody>
              </table>
            </td>
          </tr>
        </div>
      
  </html>
  `;
  const html = generateHTML(data);

  const onSubmitHandle = async () => {
    try {
      await axios.post(`${url}/detail`, data);
      await Print.printAsync({
        html,
      });
      navigation.navigate("SPK");
    } catch {
      (e) => console.error(`Error: ${e}`);
    }
  };

  const handleRemove = (removeIndex) => {
    setData((oldArray) => {
      return oldArray.filter((value, i) => i !== removeIndex);
    });
  };
  return (
    <TailwindProvider>
      <ScrollView>
        <View style={styles.container} className="justify-between pl-4 pr-2 py-2">
          <Text style={styles.input}>Detail</Text>
          <TextInput placeholder="Detail" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeDetail(value)} />
        </View>
        {/* style={styles.container} className="justify-between pl-4 pr-2 pb-2 w-96" */}
        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Tipe</Text>
          <Picker
            selectedValue={(detail && detail.tipe) || "Jasa"}
            onValueChange={(value) => setDetail({ ...detail, tipe: value })}
            mode="dropdown" // Android only
            style={styles.picker}
          >
            {tipe.map((e, index) => (
              <Picker.Item key={index} label={e} value={e} />
            ))}
          </Picker>
        </View>
        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Jumlah</Text>
          <TextInput keyboardType="numeric" placeholder="Jumlah" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeJumlah(value)} />
        </View>
        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Satuan</Text>
          <TextInput placeholder="Satuan" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeSatuan(value)} />
        </View>
        <View style={styles.container} className="justify-between pl-4 pr-2 pb-2">
          <Text style={styles.input}>Harga</Text>
          <TextInput keyboardType="numeric" placeholder="Harga" className=" bg-white rounded-md w-2/4 pl-4 py-1" onChangeText={(value) => onChangeHarga(value)} />
        </View>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{ width: 8 }}>No</DataTable.Title>
            <DataTable.Title>Detail</DataTable.Title>
            <DataTable.Title>Tipe</DataTable.Title>
            <DataTable.Title>Jumlah</DataTable.Title>
            <DataTable.Title>Satuan</DataTable.Title>
            <DataTable.Title>Harga</DataTable.Title>
            {/* <DataTable.Title>Total</DataTable.Title> */}
            <DataTable.Title>Action</DataTable.Title>
          </DataTable.Header>
          {data.length < 0
            ? ""
            : data.map((e, i) => (
                <DataTable.Row key={i}>
                  <DataTable.Cell>{i + 1}</DataTable.Cell>
                  <DataTable.Cell>{e.detail}</DataTable.Cell>
                  <DataTable.Cell>{e.tipe}</DataTable.Cell>
                  <DataTable.Cell>{e.jumlah}</DataTable.Cell>
                  <DataTable.Cell>{e.satuan}</DataTable.Cell>
                  <DataTable.Cell>{e.harga}</DataTable.Cell>
                  {/* <DataTable.Cell>{e.total}</DataTable.Cell> */}
                  <DataTable.Cell>
                    <ButtonComp onPress={() => handleRemove(i)} classNa=" bg-red-400 rounded-md active:bg-red-700 p-1 text-xs" icox="delete" />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
        </DataTable>
        <View className="justify-center" style={{ flexDirection: "row" }}>
          <Text className="font-medium text-lg">Total : {convertRupiah.convert(data.reduce((sum, i) => (sum += i.jumlah * i.harga), 0))}</Text>
        </View>
      </ScrollView>
      <View style={styles.containerbox}>
        <ButtonComp title="TAMBAH" classNa="bg-orange-500 py-4 active:bg-orange-700 rounded-none flex-1 mr-1 mt-2 rounded-tr-md" onPress={tambahdata} />
        <ButtonComp title="CETAK SPK" classNa="bg-zinc-600 py-4 active:bg-zinc-700 rounded-none flex-1 ml-1 mt-2 rounded-tl-md" onPress={onSubmitHandle} />
      </View>
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
  containerbox: {
    flexDirection: "row",
  },
  picker: {
    width: 185,
    height: 10,
    padding: 10,
    backgroundColor: "white",
    fontSize: 1,
  },
  table: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
});
