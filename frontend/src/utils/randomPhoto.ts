const photoUrls = [
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2Ftaide%20ja%20ilmaisu%2Fkehosoittimet%20taputus.png?alt=media&token=ea736779-c403-426c-a7a4-e4e567486c54",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2Ftaide%20ja%20ilmaisu%2Fc9af351c6f294ebfa1d02a75e90afef6%20(3).png?alt=media&token=fad6a8d8-2164-4fca-b65e-0c0b46d80125",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2Farjen%20taidot%2Fvauva%20ja%20pingviini%20j%C3%A4%C3%A4ll%C3%A41%20(1).png?alt=media&token=b61958ec-d2cd-4968-85e6-0f908601904c",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2Farjen%20taidot%2Fpingviini%20tekee%20j%C3%A4%C3%A4tel%C3%B6a%C3%A4.png?alt=media&token=5dfdc411-fb06-481d-907a-7e04f70d620d",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2Farjen%20taidot%2F2e576c5aff104bd19a0b92dc1a69f8e7%20(2).png?alt=media&token=cb6733f2-fc64-4cde-8926-159339fb9a9d",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2Farjen%20taidot%2F0dde67426b17497d925e36f1f2a92817.png?alt=media&token=54d97551-59aa-49fe-b13a-9a824f135364",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2FLeikit%20ja%20leikkipaikat%2Fmaja%2C%20tiipii%20intiaaniteltta%20ja%20iloinen%20leikki-ik%C3%A4inen.png?alt=media&token=758279fe-2e81-4a4e-9a79-7600c9f1db33",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2FLeikit%20ja%20leikkipaikat%2Fnoitakeitti%C3%B6%2C%20taapero%20tekee%20noitakeittoa.png?alt=media&token=ee8048e1-fe57-4968-b930-b858c81f3b49",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2FLeikit%20ja%20leikkipaikat%2Fpingviini%20ja%20poika%20tanssii2.png?alt=media&token=24e6d58d-489a-421a-b49d-046cf5f864c4",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2FLeikit%20ja%20leikkipaikat%2F37e78fadf4c449d3943dc64d2da6ce63%20(1).png?alt=media&token=9d08a0d3-87b1-4b45-a22b-b949d12bc792",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2FLeikit%20ja%20leikkipaikat%2Fhiekka%20%C3%A4mp%C3%A4ri.png?alt=media&token=c849b185-216d-4562-bfdf-89932e828a1e",
  "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Factivities%2FLeikit%20ja%20leikkipaikat%2Fkuutti%20kylpy.png?alt=media&token=aee109bd-e252-4035-9a84-9020d0f60edc",
];

export default function selectRandomPhoto() {
  const randomIndex = Math.floor(Math.random() * photoUrls.length);
  return photoUrls[randomIndex];
}
