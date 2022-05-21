import { db } from '../../Database/DatabaseConfig/firebase';
// firebase db read 모듈 불러오기
import { doc, getDoc, getDocFromCache } from 'firebase/firestore';
// 회원정보 기본데이터 틀(기반) 불러오기
import { UserInfo } from '../../Database/Data/User/userInfo';

let readDoc = {}; // firebase에서 읽어온 데이터를 선언 할 변수이다.
export let userInfoDatas = [];


// firebase db 회원정보 불러오기, 로그인 기능 포함
export default async function  Read() {
  // 회원정보 문서 db 불러오기
  const myDoc = doc(db, 'CollectionNameCarpoolTicket', 'UserInfo'); 

  const docSnap =  await getDoc(myDoc);

  
    if (docSnap.exists()) {
      readDoc = docSnap.data();
      userInfoDatas = readDoc.UserInfo;
      
    //   for (let i = 0; i < userInfoDatas.length; i++) {
    //     // 로그인 성공
    //     if (userInfoDatas[i].student_number === studentNumber && userInfoDatas[i].password === password) {
    //       SetSignIn(true);
    //       UserInfoDefaultData.nickname = userInfoDatas[i].nickname;
    //       UserInfoDefaultData.student_number = userInfoDatas[i].student_number;
    //       UserInfoDefaultData.department = userInfoDatas[i].department;

    //       console.log("회원정보 기본데이터 값 : ", UserInfoDefaultData);
    //     }
    //   }
    // }
  }
}

// export default { Read, userInfoDatas };