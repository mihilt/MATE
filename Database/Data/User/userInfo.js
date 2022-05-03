// 회원정보 가본 데아터 구성
export const UserInfo = {
    UserInfo : [
        // 0 인덱스는 패신저
        // 1 인덱스는 드라이버

        {
            nickname: "", // 성명
            student_number: 0, // 학번
            department: "", // 학과
            status_message: "", // 상태메세지
            //keyword: "", // 키워드
            auth: "pesinger",
        },

        {
            nickname: "", // 성명
            student_number: 0, // 학번
            department: "", // 학과
            auth: "캬풀", // 카풀인지 택시인지 카풀이면 티켓 생성 09시까지 가능
            status_message: "driver", // 상태메세지
        }
    ],

    // 프로필 사용
    Pesinger : [
        {
            nickname: "", // 성명
            student_number: "", // 학번
            department: "", // 학과
            status_message: "", // 상태메세지
            //keyword: "", // 키워드
            auth: "",
        },
    ],
    Driver : [
        {
            nickname: "", // 성명
            student_number: "", // 학번
            department: "", // 학과
            status_message: "", // 상태메세지
            //keyword: "", // 키워드
            recruitment_count: 0,
            auth: "",
            open_chat: "",
            open_chat_password: "",
            
        },
    ],

    // 로그인 할 때 사용
    Pesinger_login : [

    ],

    Driver_login : [

    ],

};