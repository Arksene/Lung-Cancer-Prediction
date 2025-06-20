import { useEffect, useState } from "react";
import Stepper from "../components/stepper";
import { Client } from "@gradio/client";

export default function PredictForm() {
  const [gender, setGender] = useState("Male");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [smoking, setSmoking] = useState("Tidak");
  const [yellowFingers, setYellowFingers] = useState("Tidak");
  const [anxiety, setAnxiety] = useState("Tidak");
  const [peerPressure, setPeerPressure] = useState("Tidak");
  const [chronicDisease, setChronicDisease] = useState("Tidak");
  const [fatigue, setFatigue] = useState("Tidak");
  const [allergy, setAllergy] = useState("Tidak");
  const [wheezing, setWheezing] = useState("Tidak");
  const [alcoholConsuming, setAlcoholConsuming] = useState("Tidak");
  const [coughing, setCoughing] = useState("Tidak");
  const [shortnessOfBreath, setShortnessOfBreath] = useState("Tidak");
  const [swallowingDifficulty, setSwallowingDifficulty] = useState("Tidak");
  const [chestPain, setChestPain] = useState("Tidak");
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(1);
  const [oxygenSaturation, setOxygenSaturation] = useState(85);
  const [familyHistory, setFamilyHistory] = useState("Tidak");
  const [smokingFamilyHistory, setSmokingFamilyHistory] = useState("Tidak");
  const [stressImmune, setStressImmune] = useState("Tidak");

  // Calculate age from birth date
  useEffect(() => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let calculatedAge = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        calculatedAge--;
      }

      setAge(calculatedAge);
    }
  }, [birthDate]);

  const convertToPredictionFormat = () => {
    return {
      gender: gender,
      age: age,
      smoking: smoking === "Ya" ? 1 : 0,
      finger_discoloration: yellowFingers === "Ya" ? 1 : 0,
      mental_stress: anxiety === "Ya" ? 1 : 0,
      exposure_to_pollution: peerPressure === "Ya" ? 1 : 0,
      long_term_illness: chronicDisease === "Ya" ? 1 : 0,
      energy_level: energyLevel,
      immune_weakness: allergy === "Ya" ? 1 : 0,
      breathing_issue: wheezing === "Ya" ? 1 : 0,
      alcohol_consumption: alcoholConsuming === "Ya" ? 1 : 0,
      throat_discomfort: swallowingDifficulty === "Ya" ? 1 : 0,
      oxygen_saturation: oxygenSaturation,
      chest_tightness: chestPain === "Ya" ? 1 : 0,
      family_history: familyHistory === "Ya" ? 1 : 0,
      smoking_family_history: smokingFamilyHistory === "Ya" ? 1 : 0,
      stress_immune: stressImmune === "Ya" ? 1 : 0,
    };
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  // Fungsi submit step 2, sambungkan ke API Gradio
  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure the data entered is correct?");
    if (confirm) {
      const formData = convertToPredictionFormat();

      // Payload API sesuai fitur yang kamu minta
      const apiPayload = {
        age: formData.age,
        gender: formData.gender,
        smoking: formData.smoking,
        finger_discoloration: formData.finger_discoloration,
        mental_stress: formData.mental_stress,
        exposure_to_pollution: formData.exposure_to_pollution,
        long_term_illness: formData.long_term_illness,
        energy_level: formData.energy_level,
        immune_weakness: formData.immune_weakness,
        breathing_issue: formData.breathing_issue,
        alcohol_consumption: formData.alcohol_consumption,
        throat_discomfort: formData.throat_discomfort,
        oxygen_saturation: formData.oxygen_saturation,
        chest_tightness: formData.chest_tightness,
        family_history: formData.family_history,
        smoking_family_history: formData.smoking_family_history,
        stress_immune: formData.stress_immune,
      };

      try {
        console.log(apiPayload);
        const client = await Client.connect("Arksene/LungCancerRF");
        const result = await client.predict("/predict", apiPayload);
        console.log(result.data[0]);

        setPredictionResult({
          data: apiPayload,
          risk_status: result.data[0] || "No result",
          model_used: "Lung Cancer Classification",
        });
      } catch (error) {
        setPredictionResult({
          data: apiPayload,
          risk_status: "API Error",
          model_used: "Lung Cancer Classification",
        });
      }
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setGender("Male");
    setBirthDate("");
    setAge(null);
    setSmoking("Tidak");
    setYellowFingers("Tidak");
    setAnxiety("Tidak");
    setPeerPressure("Tidak");
    setChronicDisease("Tidak");
    setAllergy("Tidak");
    setWheezing("Tidak");
    setAlcoholConsuming("Tidak");
    setSwallowingDifficulty("Tidak");
    setChestPain("Tidak");
    setFamilyHistory("Tidak");
    setSmokingFamilyHistory("Tidak");
    setStressImmune("Tidak");
    setEnergyLevel(1);
    setOxygenSaturation(85);
    setCurrentStep(0);
    setIsSubmitted(false);
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-4">
      <div className="container mx-auto px-4">
        <main
          id="formArea"
          className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-2xl border-2 border-blue-200"
        >
          {!isSubmitted && (
            <>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00B7E0] rounded-full mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-[#00B7E0] mb-1">
                  Klasifikasi Risiko Kanker Paru
                </h1>
                <p className="text-sm text-gray-600">
                  Isi form berikut untuk Mengetahui kanker paru Anda.
                </p>
              </div>
              <Stepper currentStep={currentStep} />

              {currentStep === 0 && (
                <form className="space-y-4 mt-4" onSubmit={handleSubmitStep1}>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-xl border-2 border-blue-300 shadow">
                    <label className="block text-base font-semibold text-gray-800 mb-3">
                      Gender
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Male", "Female"].map((g) => (
                        <div key={g}>
                          <input
                            type="radio"
                            id={g}
                            name="gender"
                            value={g}
                            checked={gender === g}
                            onChange={(e) => setGender(e.target.value)}
                            className="hidden"
                            required
                          />
                          <label
                            htmlFor={g}
                            className={`cursor-pointer border-2 rounded-lg p-3 flex flex-col justify-center items-center gap-2 ${
                              gender === g
                                ? "border-[#00B7E0] bg-[#00B7E0]/10 text-[#00B7E0]"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                gender === g ? "bg-[#00B7E0]/20" : "bg-gray-100"
                              }`}
                            >
                              <svg
                                className={`w-4 h-4 ${
                                  gender === g
                                    ? "text-[#00B7E0]"
                                    : "text-gray-600"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <span className="font-medium text-sm">{g}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-100 to-pink-50 p-4 rounded-xl border-2 border-purple-300 shadow">
                    <label className="block text-base font-semibold text-gray-800 mb-3">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none text-sm"
                      required
                    />
                    {age !== null && (
                      <div className="mt-3 p-2 bg-white rounded-lg border border-purple-200">
                        <span className="text-xs text-gray-600">
                          Your Age:{" "}
                        </span>
                        <span className="text-sm font-semibold text-purple-600">
                          {age} years
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-center pt-3">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#00B7E0] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00B7E0] text-white px-8 py-2 rounded-xl font-bold text-base shadow-lg transition"
                    >
                      Next →
                    </button>
                  </div>
                </form>
              )}

              {currentStep === 1 && (
                <form className="space-y-6 mt-4" onSubmit={handleSubmitStep2}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pertanyaan binary */}
                    {[
                      {
                        label: "Apakah Anda merokok?",
                        state: smoking,
                        setState: setSmoking,
                        color: "from-red-100 to-red-50 border-red-300",
                      },
                      {
                        label: "Apakah jari Anda berubah warna (menguning)?",
                        state: yellowFingers,
                        setState: setYellowFingers,
                        color: "from-yellow-100 to-yellow-50 border-yellow-300",
                      },
                      {
                        label: "Apakah Anda sering mengalami stres mental?",
                        state: anxiety,
                        setState: setAnxiety,
                        color: "from-orange-100 to-orange-50 border-orange-300",
                      },
                      {
                        label: "Apakah Anda sering terpapar polusi?",
                        state: peerPressure,
                        setState: setPeerPressure,
                        color: "from-blue-100 to-blue-50 border-blue-300",
                      },
                      {
                        label: "Apakah Anda memiliki penyakit jangka panjang?",
                        state: chronicDisease,
                        setState: setChronicDisease,
                        color: "from-purple-100 to-purple-50 border-purple-300",
                      },
                      {
                        label: "Apakah Anda memiliki kelemahan sistem imun?",
                        state: allergy,
                        setState: setAllergy,
                        color: "from-pink-100 to-pink-50 border-pink-300",
                      },
                      {
                        label: "Apakah Anda mengalami masalah pernapasan?",
                        state: wheezing,
                        setState: setWheezing,
                        color: "from-teal-100 to-teal-50 border-teal-300",
                      },
                      {
                        label: "Apakah Anda mengonsumsi alkohol?",
                        state: alcoholConsuming,
                        setState: setAlcoholConsuming,
                        color: "from-indigo-100 to-indigo-50 border-indigo-300",
                      },
                      {
                        label:
                          "Apakah Anda mengalami ketidaknyamanan di tenggorokan?",
                        state: swallowingDifficulty,
                        setState: setSwallowingDifficulty,
                        color: "from-pink-100 to-pink-50 border-pink-300",
                      },
                      {
                        label: "Apakah Anda mengalami sesak dada?",
                        state: chestPain,
                        setState: setChestPain,
                        color: "from-red-100 to-red-50 border-red-300",
                      },
                      {
                        label:
                          "Apakah ada riwayat kanker paru di keluarga Anda?",
                        state: familyHistory,
                        setState: setFamilyHistory,
                        color: "from-gray-100 to-gray-50 border-gray-300",
                      },
                      {
                        label: "Apakah ada anggota keluarga yang merokok?",
                        state: smokingFamilyHistory,
                        setState: setSmokingFamilyHistory,
                        color: "from-gray-100 to-gray-50 border-gray-300",
                      },
                      {
                        label:
                          "Apakah Anda mengalami stres yang mempengaruhi sistem imun?",
                        state: stressImmune,
                        setState: setStressImmune,
                        color: "from-gray-100 to-gray-50 border-gray-300",
                      },
                    ].map(({ label, state, setState, color }) => (
                      <div
                        key={label}
                        className={`bg-gradient-to-r ${color} p-4 rounded-xl border-2 shadow-md flex flex-col gap-2`}
                      >
                        <label className="block text-base font-semibold text-gray-800 mb-2">
                          {label}
                        </label>
                        <div className="flex gap-4">
                          {["Ya", "Tidak"].map((val) => (
                            <label
                              key={val}
                              htmlFor={`${label}-${val}`}
                              className={`flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-lg border-2 px-3 py-2 font-medium text-sm transition
                  ${
                    state === val
                      ? "bg-blue-500 text-white border-blue-500 shadow"
                      : `border-${color} text-gray-700 hover:border-blue-400 hover:bg-blue-50`
                  }`}
                            >
                              <input
                                type="radio"
                                id={`${label}-${val}`}
                                name={label}
                                value={val}
                                checked={state === val}
                                onChange={() => setState(val)}
                                className="w-4 h-4 accent-blue-500"
                                required
                              />
                              {val}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Pertanyaan scale: Energi */}
                  <div className="bg-gradient-to-r from-green-100 to-green-50 border-green-300 p-4 rounded-xl border-2 shadow-md flex flex-col gap-2 mt-6">
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                      Bagaimana tingkat energi Anda? (Semakin Kecil Artinya
                      Semakin Mudah Lelah)
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={energyLevel}
                      onChange={(e) => setEnergyLevel(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600">
                      Nilai: {energyLevel}
                    </div>
                  </div>
                  {/* Pertanyaan scale: Saturasi Oksigen */}
                  <div className="bg-gradient-to-r from-blue-100 to-blue-50 border-blue-300 p-4 rounded-xl border-2 shadow-md flex flex-col gap-2 mt-6">
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                      Bagaimana tingkat saturasi oksigen Anda? (kurang dari 90
                      Berbahaya)
                    </label>
                    <input
                      type="range"
                      min={85}
                      max={100}
                      value={oxygenSaturation}
                      onChange={(e) =>
                        setOxygenSaturation(Number(e.target.value))
                      }
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600">
                      Nilai: {oxygenSaturation}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 gap-3">
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition shadow"
                      onClick={() => setCurrentStep(0)}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-8 py-2 rounded-xl font-bold text-base shadow-lg transition"
                    >
                      Submit Assessment
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
          {isSubmitted && predictionResult && (
            <div className="max-w-lg mx-auto mt-8 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Assessment Submitted!
              </h2>
              <p className="mb-4 text-gray-700">
                Your data has been processed.
              </p>
              <div className="mb-4">
                <span className="font-semibold">Risk Status: </span>
                <span className="text-blue-600">
                  {predictionResult.risk_status}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Model Used: </span>
                <span className="text-gray-700">
                  {predictionResult.model_used}
                </span>
              </div>
              <button
                className="bg-[#00B7E0] hover:bg-[#0099CC] text-white px-6 py-2 rounded-lg font-semibold text-sm mt-2"
                onClick={handleReset}
              >
                Fill Again
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
