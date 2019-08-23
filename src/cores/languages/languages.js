import LocalizedStrings from 'react-native-localization';
import {Text} from "react-native";
import React from "react";
import TextComponent from "../viewComponents/text/TextComponent";
// import { Book } from 'epubjs';
// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');
const Locales = new LocalizedStrings({
    "en-US": {
        Skip: 'SKIP',
        Next: 'NEXT',
        Finish: 'FINISH',
        Title1Splash2: 'Discover More',
        Title2Splash2: 'Easy Search',
        Title3Splash2: 'Modern Properties',
        Text1Splash2: 'The first mate and his Skipper too will do their very comfortable in their tropic island nest to till the end.',
        Text2Splash2: 'The first mate and his Skipper too will do their very comfortable in their tropic island nest to till the end.',
        Text3Splash2: 'The first mate and his Skipper too will do their very comfortable in their tropic island nest to till the end.',
        LoginSplash3: 'LOGIN',
        RegisterSplash3: 'REGISTER',
        TitleSignup: 'Signup here now!',
        TextInputName: 'Name',
        TextInputPhone: 'Phone Number',
        TextInputEmail: 'Email id',
        TextInputPass: 'Password',
        TextInputConfirmPass: 'Confirm Password',
        ButtonSignup: 'SIGNUP',
        Text1Signup: 'Already have an account?',
        Text2Signup: 'Sign in',
        TitleLogin: 'Login to Continue',
        Keep_me_Signin: 'Keep me Sign in?',
        ButtonLogin: 'LOGIN',
        Text1Login: "Don't have account?",
        Text2Login: "Sign up",
        Text3Login: "-or-",
        ButtonFB: "LOGIN WITH",
        ButtonTwitter: "LOGIN WITH",
        TitleWelcome: "Hello! Welcome",
        TextWelcome: "The first mate and his Skipper too will do their very comfortable",
        ButtonWelcome: "USE CURRENT LOCATIONS",
        Home: "HOME",
        SearchHome: "Search...",
        BuyHome: "BUY",
        SellHome: "SELL",
        PopularHome: "POPULAR CITIES",
        ForSaleHome: "FOR SALE CITY",
        Favourites: "FAVOURITES",
        Profile: "PROFILE",
        Followers: "Followers",
        PropertiesProfile: "Properties",
        RecentlyProfile: "RECENTLY VIEWED",
        Settings: "SETTINGS",
        CountrySettings: "COUNTRY",
        DankthemesSettings: "DARK THEMES",
        LanguageSettings: "LANGUAGE",
        language:"English",
        SelectYourLanguage: "Select Your Language",
        CancelSettings: "Cancel",
        PrivacySettings: "PRIVACY POLICY",
        FaqSettings: "FAQ'S",
        HelpSettings: "HELP & SUPPORT",
        LogoutSettings: "LOGOUT",
        Map: "MAP",
        SearchMap: "Search...",
        Properties: "PROPERTIES",
        SearchProperties: "Search...",
        HouseProperties: "House",
        PriceProperties: "Price",
        MostPopular: "MOST POPULAR",
        TopRated: "TOP RATED",
        Recommended: "RECOMMENDED",
        Details: "DETAILS",
        PropertyOwner: "Property Owner",
        Call: "CALL",
        Mail: "MAIL",
        Bedrooms: "4 BEDROOMS",
        Bathrooms: "5 BATHROOMS",
        Kitchen: "1 KITCHEN",
        Parkings: "3 PARKINGS",
        PropertyType: "Property Type:",
        YearofBuild: "Year of Build:",
        Landmark: "Landmark:",
        Details2: "Details:",
        textDescription: "The first mate and his skipper too will do their very comfortable into their tropic island nest to till the end the weather started getting rough - the tiny ship was tossed.",
        Photos: "Photos:",
        News: "NEWS",
        RealEstateNews: "Real Estate News",
        OtherNews: "OTHER NEWS",
        EditAccount: "Edit Account",
        SelectImage: "Select Image",
        FirstAndLastName: "First and last name",
        PhoneNumber: "Phone number",
        Address: "Address",
        Update: "UPDATE",
        Cancel: "CANCEL",
        Postsaleofrealestate: "Post sale of real estate",
        Pleasecompletefulltheinformation: "Please complete full the information!",
        Nameofrealestate: "Name of real estate",
        Ownerofrealestate: "Owner of real estate",
        Enterthetotalpriceofrealestate: "Enter the total price of real estate",
        Enterrealestateacreage: "Enter real estate acreage",
        Yearbuilt: "Year built",
        Describerealestate: "Describe real estate",
        Realestatedetails: "Real estate details",
        ChooseLocationForRealEstate: "Choose Location For Real Estate",
        POSTBELIEVE: "POST BELIEVE",
        SelectLocation: "Select Location",
        Seedetails: "See details",
        RealEstateDetails: "Real Estate Details",
        Described: "Described",
        Directions: "Directions",
        City: "City",
        Owners: "Owners",
        CallPhone: "Call",
        Ask: "Ask",
        Care: "Care",
        ChooseTheCity: "Choose The City",
        ChooseRealEstateType: "Choose Real Estate Type",
        SelectDirection: "Select Direction",
        Followedby: "Followed by",
        people: "people",
        PostSale: "Post Sale",
        EditPost: "Edit Post",
        PersonalInformation: "Personal Information",
        Chat: "Chat",
        Follow: "Follow",
        VIEWTHERECENTPOSTS: "VIEW THE RECENT POSTS",
        Change_Theme: "Change Theme",
        Change_Color: "Change Color",
        Agree: 'Agree',
    },
    'vn': {
        Skip: 'Bỏ qua',
        Next: 'Tiếp theo',
        Finish: 'Hoàn thành',
        Title1Splash2: 'Khám phá thêm',
        Title2Splash2: 'Tìm kiếm dễ dàng',
        Title3Splash2: 'Thuộc tính hiện đại',
        Text1Splash2: 'Người bạn đời đầu tiên và Skipper của anh ta cũng sẽ rất thoải mái trong tổ đảo nhiệt đới của họ cho đến cuối cùng.',
        Text2Splash2: 'Người bạn đời đầu tiên và Skipper của anh ta cũng sẽ rất thoải mái trong tổ đảo nhiệt đới của họ cho đến cuối cùng.',
        Text3Splash2: 'Người bạn đời đầu tiên và Skipper của anh ta cũng sẽ rất thoải mái trong tổ đảo nhiệt đới của họ cho đến cuối cùng.',
        LoginSplash3: 'ĐĂNG NHẬP',
        RegisterSplash3: 'ĐĂNG KÝ',
        TitleSignup: 'Đăng ký tại đây ngay bây giờ!',
        TextInputName: 'Tên',
        TextInputPhone: 'Số điện thoại',
        TextInputEmail: 'Email id',
        TextInputPass: 'Mật khẩu',
        TextInputConfirmPass: 'Xác nhận mật khẩu',
        ButtonSignup: 'ĐĂNG KÝ',
        Text1Signup: 'Đã có tài khoản?',
        Text2Signup: 'Đăng nhập',
        TitleLogin: 'Đăng nhập để tiếp tục',
        Keep_me_Signin: 'Giữ tôi đăng nhập?',
        ButtonLogin: 'ĐĂNG NHẬP',
        Text1Login: "Không có tài khoản?",
        Text2Login: "Đăng ký",
        Text3Login: "-hoặc-",
        ButtonFB: "ĐĂNG NHẬP VỚI",
        ButtonTwitter: "ĐĂNG NHẬP VỚI",
        TitleWelcome: "Xin chào! Chào mừng",
        TextWelcome: "Người bạn đời đầu tiên và Skipper của anh ấy cũng sẽ làm họ rất thoải mái",
        ButtonWelcome: "SỬ DỤNG VỊ TRÍ HIỆN TẠI",
        Home: "TRANG CHỦ",
        SearchHome: "Tìm kiếm...",
        BuyHome: "MUA",
        SellHome: "BÁN",
        PopularHome: "CÁC CĂN HỘ PHỔ BIẾN",
        ForSaleHome: "CÁC TIN ĐĂNG BÁN",
        Favourites: "YÊU THÍCH",
        Profile: "HỒ SƠ",
        Followers: "Người theo dõi",
        PropertiesProfile: "Thuộc tính",
        RecentlyProfile: "XEM GẦN ĐÂY",
        Settings: "CÀI ĐẶT",
        CountrySettings: "QUỐC GIA",
        DankthemesSettings: "CHẾ ĐỘ TỐI",
        LanguageSettings: "NGÔN NGỮ",
        language:"Việt Nam",
        SelectYourLanguage: "Chọn ngôn ngữ",
        CancelSettings: "Hủy",
        PrivacySettings: "CHÍNH SÁCH RIÊNG TƯ",
        FaqSettings: "FAQ'S",
        HelpSettings: "GIÚP & Hỗ TRỢ",
        LogoutSettings: "ĐĂNG KÝ",
        Map: "BẢN ĐỒ",
        SearchMap: "Tìm kiếm...",
        Properties: "TÍNH CHẤT",
        SearchProperties: "Tìm kiếm...",
        HouseProperties: "Nhà",
        PriceProperties: "Giá",
        MostPopular: "PHỔ BIẾN NHẤT",
        TopRated: "HÀNG ĐẦU",
        Recommended: "KHUYẾN NGHỊ",
        Details: "CHI TIẾT",
        PropertyOwner: "Chủ sở hữu tài sản",
        Call: "GỌI",
        Mail: "THƯ",
        Bedrooms: "4 Phòng ngủ",
        Bathrooms: "5 Phòng tắm",
        Kitchen: "1 Bếp",
        Parkings: "3 Bãi đỗ xe",
        PropertyType: "Loại tài sản:",
        YearofBuild: "Năm xây dựng:",
        Landmark: "Cột mốc:",
        Details2: "Chi tiết:",
        textDescription: "Người bạn đời đầu tiên và người đội trưởng của anh ta cũng sẽ rất thoải mái vào tổ đảo nhiệt đới của họ cho đến khi thời tiết bắt đầu trở nên xù xì - con tàu nhỏ bị ném.",
        Photos: "Ảnh:",
        News: "TIN TỨC",
        RealEstateNews: "Tin Bất Động Sản",
        OtherNews: "TIN KHÁC",
        EditAccount: "Chỉnh Sửa Tài Khoản",
        SelectImage: "Chọn Ảnh",
        FirstAndLastName: "Họ và tên",
        PhoneNumber: "Số điện thoại",
        Address: "Địa chỉ",
        Update: "CẬP NHẬT",
        Cancel: "HỦY",
        Postsaleofrealestate: "Bán Bất Động Sản",
        Pleasecompletefulltheinformation: "Vui lòng điền đầy đủ thông tin!",
        Nameofrealestate: "Tên bất động sản",
        Ownerofrealestate: "Chủ sở hữu bất động sản",
        Enterthetotalpriceofrealestate: "Nhập tổng giá trị bất động sản",
        Enterrealestateacreage: "Nhập diện tích bất động sản",
        Yearbuilt: "Năm xây dựng",
        Describerealestate: "Mô tả bất động sản",
        Realestatedetails: "Chi tiết bất động sản",
        ChooseLocationForRealEstate: "Chọn địa điểm cho bất động sản",
        POSTBELIEVE: "ĐĂNG TIN",
        SelectLocation: "Chọn Địa Điểm",
        Seedetails: "Xem chi tiết",
        RealEstateDetails: "Chi Tiết Bất Động Sản",
        Described: "Mô tả",
        Directions: "Hướng",
        City: "Thành phố",
        Owners: "Chủ sở hữu",
        CallPhone: "Gọi Điện",
        Ask: "Hỏi",
        Care: "Quan Tâm",
        ChooseTheCity: "Chọn Thành Phố",
        ChooseRealEstateType: "Chọn Loại Bất Động Sản",
        SelectDirection: "Chọn Hướng",
        Followedby: "Theo dõi bởi",
        people: "người",
        PostSale: "Đăng Tin",
        EditPost: "Sửa Tin",
        PersonalInformation: "Thông Tin Cá Nhân",
        Chat: "Trò Chuyện",
        Follow: "Theo Dõi",
        VIEWTHERECENTPOSTS: "CÁC BÀI ĐĂNG GẦN ĐÂY",
        Change_Theme: "Đổi Giao Diện",
        Change_Color: "Đổi Màu",
        Agree: 'Đồng ý',
    },
    ar: {
        Skip: 'SKIP',
        Next: 'NEXT',
        Finish: 'FINISH',
        Title1Splash2: 'Discover More',
        Title2Splash2: 'Easy Search',
        Title3Splash2: 'Modern Properties',
        Text1Splash2: 'The first mate and his Skipper too will do their very comfortable in their tropic island nest to till the end.',
        Text2Splash2: 'The first mate and his Skipper too will do their very comfortable in their tropic island nest to till the end.',
        Text3Splash2: 'The first mate and his Skipper too will do their very comfortable in their tropic island nest to till the end.',
        LoginSplash3: 'LOGIN',
        RegisterSplash3: 'REGISTER',
        TitleSignup: 'Signup here now!',
        TextInputName: 'Name',
        TextInputPhone: 'Phone Number',
        TextInputEmail: 'Email id',
        TextInputPass: 'Password',
        TextInputConfirmPass: 'Confirm Password',
        ButtonSignup: 'SIGNUP',
        Text1Signup: 'Already have an account?',
        Text2Signup: 'Sign in',
        TitleLogin: 'Login to Continue',
        Keep_me_Signin: 'Keep me Sign in?',
        ButtonLogin: 'LOGIN',
        Text1Login: "Don't have account?",
        Text2Login: "Sign up",
        Text3Login: "-or-",
        ButtonFB: "LOGIN WITH",
        ButtonTwitter: "LOGIN WITH",
        TitleWelcome: "Hello! Welcome",
        TextWelcome: "The first mate and his Skipper too will do their very comfortable",
        ButtonWelcome: "USE CURRENT LOCATIONS",
        Home: "HOME",
        SearchHome: "Search...",
        BuyHome: "BUY",
        SellHome: "SELL",
        PopularHome: "POPULAR CITIES",
        ForSaleHome: "FOR SALE CITY",
        Favourites: "FAVOURITES",
        Profile: "PROFILE",
        Followers: "Followers",
        PropertiesProfile: "Properties",
        RecentlyProfile: "RECENTLY VIEWED",
        Settings: "SETTINGS",
        CountrySettings: "COUNTRY",
        DankthemesSettings: "DARK THEMES",
        LanguageSettings: "LANGUAGE",
        language:"Arabic",
        PrivacySettings: "PRIVACY POLICY",
        FaqSettings: "FAQ'S",
        HelpSettings: "HELP & SUPPORT",
        LogoutSettings: "LOGOUT",
        Map: "MAP",
        SearchMap: "Search...",
        Properties: "PROPERTIES",
        SearchProperties: "Search...",
        HouseProperties: "House",
        PriceProperties: "Price",
        MostPopular: "MOST POPULAR",
        TopRated: "TOP RATED",
        Recommended: "RECOMMENDED",
        Details: "DETAILS",
        PropertyOwner: "Property Owner",
        Call: "CALL",
        Mail: "MAIL",
        Bedrooms: "4 BEDROOMS",
        Bathrooms: "5 BATHROOMS",
        Kitchen: "1 KITCHEN",
        Parkings: "3 PARKINGS",
        PropertyType: "Property Type:",
        YearofBuild: "Year of Build:",
        Landmark: "Landmark:",
        Details2: "Details:",
        textDescription: "The first mate and his skipper too will do their very comfortable into their tropic island nest to till the end the weather started getting rough - the tiny ship was tossed.",
        Photos: "Photos:",
        News: "NEWS",
        RealEstateNews: "Real Estate News",
        OtherNews: "OTHER NEWS",
        EditAccount: "Edit Account",
        SelectImage: "Select Image",
        FirstAndLastName: "First and last name",
        PhoneNumber: "Phone number",
        Address: "Address",
        Update: "UPDATE",
        Cancel: "CANCEL",
        Postsaleofrealestate: "Post sale of real estate",
        Pleasecompletefulltheinformation: "Please complete full the information!",
        Nameofrealestate: "Name of real estate",
        Ownerofrealestate: "Owner of real estate",
        Enterthetotalpriceofrealestate: "Enter the total price of real estate",
        Enterrealestateacreage: "Enter real estate acreage",
        Yearbuilt: "Year built",
        Describerealestate: "Describe real estate",
        Realestatedetails: "Real estate details",
        ChooseLocationForRealEstate: "Choose Location For Real Estate",
        POSTBELIEVE: "POST BELIEVE",
        SelectLocation: "Select Location",
        Seedetails: "See details",
        RealEstateDetails: "Real Estate Details",
        Described: "Described",
        Directions: "Directions",
        City: "City",
        Owners: "Owners",
        CallPhone: "Call",
        Ask: "Ask",
        Care: "Care",
        ChooseTheCity: "Choose The City",
        ChooseRealEstateType: "Choose Real Estate Type",
        SelectDirection: "Select Direction",
        Followedby: "Followed by",
        people: "people",
        PostSale: "Post Sale",
        EditPost: "Edit Post",
        PersonalInformation: "Personal Information",
        Chat: "Chat",
        Follow: "Follow",
        VIEWTHERECENTPOSTS: "VIEW THE RECENT POSTS",
        Change_Theme: "Change Theme",
        Change_Color: "Change Color",
        Agree: 'Agree',
    },
});
export default Locales;
