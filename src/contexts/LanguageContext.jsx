import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  id: {
    /* Navbar */
    navActive:      'Aktif',
    navArchive:     'Arsip',
    navNew:         '+ Catatan Baru',
    navLogout:      'Keluar',

    /* Home */
    homeTitle:      'Catatan Aktif',
    archiveTitle:   'Arsip',
    notes:          'catatan',

    /* Search */
    searchPlaceholder: 'Cari catatan...',

    /* Empty states */
    emptyNotes:          'Tidak ada catatan',
    emptyNotesHint:      'Mulai tambah catatan baru dengan tombol di bawah',
    emptyArchive:        'Arsip kosong',
    emptyArchiveHint:    'Catatan yang diarsipkan akan muncul di sini',
    emptySearchNotes:    'Tidak ada catatan dengan kata kunci',
    emptySearchArchive:  'Tidak ada arsip dengan kata kunci',
    emptySearchHint:     'Coba kata kunci yang berbeda',

    /* Note card & detail */
    btnArchive:     '⊞ Arsip',
    btnUnarchive:   '↩ Aktifkan',
    btnDelete:      'Hapus',
    btnArchiveFull: '⊞ Arsipkan',
    btnUnarchiveFull:'↩ Batalkan Arsip',
    btnDeleteFull:  'Hapus Catatan',
    archivedBadge:  'Diarsipkan',
    backToNotes:    'Kembali ke Catatan',
    backToArchive:  'Kembali ke Arsip',

    /* New note form */
    newNoteTitle:   'Catatan Baru',
    labelTitle:     'Judul',
    labelBody:      'Isi Catatan',
    titlePlaceholder: 'Judul catatan...',
    bodyPlaceholder:  'Tulis isi catatan di sini...',
    btnCancel:      'Batal',
    btnSave:        'Simpan Catatan',
    backToHome:     'Kembali',

    /* Auth */
    loginTitle:     'Masuk',
    loginSub:       'Selamat datang kembali',
    labelEmail:     'Email',
    labelPassword:  'Kata Sandi',
    labelName:      'Nama',
    labelConfirmPassword: 'Konfirmasi Kata Sandi',
    btnLogin:       'Masuk',
    btnRegister:    'Daftar',
    noAccount:      'Belum punya akun?',
    hasAccount:     'Sudah punya akun?',
    registerTitle:  'Daftar',
    registerSub:    'Buat akun baru',
    passwordMismatch: 'Kata sandi tidak cocok',
    loginFailed:    'Email atau kata sandi salah. Silakan coba lagi.',
    registerFailed: 'Registrasi gagal. Email mungkin sudah terdaftar.',

    /* 404 */
    notFoundCode:   '404',
    notFoundError:  'Kesalahan',
    notFoundText:   'Halaman tidak ditemukan',
    notFoundSub:    'Alamat URL yang kamu akses tidak tersedia atau sudah tidak ada.',
    btnBackHome:    'Kembali ke Beranda',
    noteNotFound:   'Catatan tidak ditemukan',
    noteNotFoundSub:'Catatan mungkin sudah dihapus atau ID tidak valid.',

    /* Loading */
    loading:        'Memuat...',

    /* User greeting */
    greeting:       'Halo',
  },
  en: {
    /* Navbar */
    navActive:      'Active',
    navArchive:     'Archive',
    navNew:         '+ New Note',
    navLogout:      'Logout',

    /* Home */
    homeTitle:      'Active Notes',
    archiveTitle:   'Archive',
    notes:          'notes',

    /* Search */
    searchPlaceholder: 'Search notes...',

    /* Empty states */
    emptyNotes:          'No notes found',
    emptyNotesHint:      'Start adding a new note with the button below',
    emptyArchive:        'Archive is empty',
    emptyArchiveHint:    'Archived notes will appear here',
    emptySearchNotes:    'No notes matching',
    emptySearchArchive:  'No archives matching',
    emptySearchHint:     'Try a different keyword',

    /* Note card & detail */
    btnArchive:     '⊞ Archive',
    btnUnarchive:   '↩ Restore',
    btnDelete:      'Delete',
    btnArchiveFull: '⊞ Archive Note',
    btnUnarchiveFull:'↩ Restore Note',
    btnDeleteFull:  'Delete Note',
    archivedBadge:  'Archived',
    backToNotes:    'Back to Notes',
    backToArchive:  'Back to Archive',

    /* New note form */
    newNoteTitle:   'New Note',
    labelTitle:     'Title',
    labelBody:      'Content',
    titlePlaceholder: 'Note title...',
    bodyPlaceholder:  'Write your note here...',
    btnCancel:      'Cancel',
    btnSave:        'Save Note',
    backToHome:     'Back',

    /* Auth */
    loginTitle:     'Sign In',
    loginSub:       'Welcome back',
    labelEmail:     'Email',
    labelPassword:  'Password',
    labelName:      'Full Name',
    labelConfirmPassword: 'Confirm Password',
    btnLogin:       'Sign In',
    btnRegister:    'Sign Up',
    noAccount:      "Don't have an account?",
    hasAccount:     'Already have an account?',
    registerTitle:  'Sign Up',
    registerSub:    'Create a new account',
    passwordMismatch: 'Passwords do not match',
    loginFailed:    'Invalid email or password. Please try again.',
    registerFailed: 'Registration failed. Email may already be in use.',

    /* 404 */
    notFoundCode:   '404',
    notFoundError:  'Error',
    notFoundText:   'Page not found',
    notFoundSub:    'The URL you accessed is unavailable or no longer exists.',
    btnBackHome:    'Back to Home',
    noteNotFound:   'Note not found',
    noteNotFoundSub:'The note may have been deleted or the ID is invalid.',

    /* Loading */
    loading:        'Loading...',

    /* User greeting */
    greeting:       'Hello',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'id';
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      localStorage.setItem('language', next);
      return next;
    });
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}