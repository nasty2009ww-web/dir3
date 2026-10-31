/**
 * إعدادات موقع تطبيق درع (Dir3) الرسمية
 * Dir3 Official Web Configuration
 * ----------------------------------------------------
 * يمكنك تعديل الروابط والبيانات هنا وستنعكس تلقائياً في كامل الموقع.
 */

const globalScope = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

globalScope.DIR3_CONFIG = {
  // تفاصيل التطبيق والنسخة
  app: {
    name: "Dir3",
    arabicName: "درع",
    slogan: "تصفح بلا إعلانات، ولا متعقبين ولا احتيال",
    headline: "تصفّح بحرية. بدون إعلانات.",
    subtitle: "درع يحمي خصوصيتك ويحجب الإعلانات والمتعقبات والاحتيالات مباشرة من جهازك.",
    version: "v1.4.2",
    releaseDate: "25 أكتوبر 2026",
    fileSize: "18.4 ميجابايت",
    minAndroidVersion: "Android 8.0 (Oreo) أو أحدث",
    targetArch: "arm64-v8a, armeabi-v7a, x86_64",
    sha256: "b79d86c4f31835e982187e81b6194b159f8c67a3363065d642b58d9e685f0962",
    license: "مجاني ومفتوح المصدر (GPL-3.0)"
  },

  // رابط التحميل الرسمي لملف الـ APK
  // قم بتعيين هذا الرابط لملف الـ APK الفعلي الخاص بك (مثلاً رابط GitHub Releases أو خادمك الخاص)
  download: {
    // يمكنك تعديل الرابط التالي إلى الرابط المباشر لملف الـ APK
    apkUrl: "https://files.catbox.moe/pb0m6e.apk",
    // مرآة بديلة إن وجدت
    mirrorUrl: "https://releases.dir3.app/latest/Dir3-universal.apk",
    // مصدر الكود
    githubRepoUrl: "https://github.com/dir3-shield/dir3-android"
  },

  // إحصائيات تجريبية توضيحية (Demonstration Values)
  // تم تمييزها صراحة كأرقام توضيحية، ويمكن استبدالها لاحقاً ببيانات موثقة من التطبيق
  demoStatistics: {
    isDemonstration: true,
    notice: "أرقام توضيحية تجريبية لقياس كفاءة الفلترة المسبقة قبل إصدار التقرير العام",
    adsBlocked: {
      value: 18450000,
      display: "18.4M+",
      label: "إعلان تم حجبه",
      sublabel: "في التطبيقات والمتصفحات والألعاب"
    },
    trackersBlocked: {
      value: 9230000,
      display: "9.2M+",
      label: "متعقب تم إيقافه",
      sublabel: "حماية تامة من بناء الملفات الرقمية"
    },
    scamsAverted: {
      value: 340000,
      display: "340K+",
      label: "رابط احتيالي تم إحباطه",
      sublabel: "فحص فوري لعناوين التصيد والبرمجيات الخبيثة"
    },
    batterySaved: {
      value: 28,
      display: "28%",
      label: "توفير في استهلاك البطارية والبيانات",
      sublabel: "بفضل تقليل تحميل وسائط الإعلانات الثقيلة"
    }
  },

  // روابط التواصل والدعم
  contacts: {
    supportEmail: "support@dir3.app",
    securityEmail: "security@dir3.app",
    telegram: "https://t.me/dir3_app",
    github: "https://github.com/dir3-shield/dir3-android",
    x: "https://x.com/dir3_app"
  }
};
