# API 更新日誌

## version 1.0
  - 加入API login (登入)
  - 加入API getForgotPasswordHint (取得使用者忘記密碼提示)
  - 加入API getTemporaryPassword (取得使用者臨時密碼)
  - 加入API changePassword (密碼變更)
  - 加入API getUserProfile  (取得使用者資料)
  - 加入API getUserEducationList (取得使用者學歷列表)
  - 加入API addUserEducation (新增使用者學歷)
  - 加入API editUserEducation (編輯使用者學歷)
  - 加入API removeUserEducation (移除使用者學歷)
  - 加入API getUserWorkExperience (取得使用者工作經歷列表)
  - 加入API addUserWorkExperience (編輯使用者工作經歷)
  - 加入API editUserWorkExperience (編輯使用者工作經歷)
  - 加入API removeUserWorkExperience (移除使用者工作經歷)

## version 1.1
  - 加入API editUserProfile (編輯使用者資料)
  - 加入API changeUserAvatar (更換使用者圖片)
  - API getUserWorkExperience 變更名稱為 getUserWorkExperienceList

## version 1.2
  - API changePassword 移除參數 password2 (密碼確認)
  - API getUserWorkExperienceList 加入回傳參數 duty (Duties)

## version 1.3
  - 加入API getCalendarList (取得可訂閱的日曆列表)
  - 加入API subscribeCalendar (訂閱日曆列表)

## version 1.4
  - API getCalendarList 變更名稱 為 getSubscribeCalendarList

## version 1.5
  - 加入API getNotificationSetting (取得推播設定)
  - 加入API setNotificationSetting (儲存推播設定)