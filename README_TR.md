📌 İK Yönetim Sistemi (HR Management System)
İK Yönetim Sistemi, personel, envanter ve zimmet işlemlerini güvenli kimlik doğrulama ve gerçek zamanlı bildirimlerle yönetmek için geliştirdiğim tam kapsamlı bir uygulamadır.

Sistem Şunları İçerir
Personel Yönetimi – Çalışan kayıtlarını ekleme, güncelleme, filtreleme ve profil fotoğrafı ile detaylı görüntüleme.

Envanter Yönetimi – Varlıkların takibi, durumlarının yönetimi ve envanter bilgilerinin güncellenmesi.

Zimmet İşlemleri – Envanteri personele zimmetleme, iade tarihlerini takip etme ve teslim süreçlerini yönetme.

Kimlik Doğrulama ve Yetkilendirme – JWT + Refresh Token ile rol tabanlı erişim kontrolü.

Gerçek Zamanlı Bildirimler – WebSocket (STOMP) ile anlık bildirimler.

Merkezi Loglama – Profesyonel log yönetimi için ELK Stack (Elasticsearch, Logstash, Kibana) entegrasyonu.

Proje, katmanlı mimari en iyi uygulamalarını takip eder, RESTful API yapısını kullanır ve Docker ile containerize edilerek kolay dağıtım sağlar.

🏗 Mimari ve Teknolojiler
Backend
Dil: Java 17+

Framework: Spring Boot 3.x

Build Aracı: Maven

Veritabanı: PostgreSQL

ORM: Spring Data JPA + Hibernate

Güvenlik: Spring Security ile JWT + Refresh Token

Loglama: Logback → Logstash → Elasticsearch → Kibana (ELK Stack)

API: RESTful servisler

Containerization: Docker & Docker Compose

Frontend
Framework: React

Build Aracı: Vite

Stil: TailwindCSS + Material UI bileşenleri

State Yönetimi: React Hooks + Context API

HTTP İstemcisi: JWT yönetimi için Axios Interceptor’ları

Gerçek Zamanlı İletişim: WebSocket (STOMP.js ile)

Altyapı
Docker Servisleri: Backend, Frontend, PostgreSQL, Elasticsearch, Logstash, Kibana

Indexleme & Arama: Elasticsearch

Görselleştirme: Kibana ile log dashboard’ları

🚀 Temel Özellikler
Personel Yönetimi
Personel kayıtlarını ekleme, güncelleme, silme

Ada, soyada, TCKN’ye veya birime göre filtreleme

Profil fotoğrafı yükleme ve görüntüleme

Çalışma geçmişini takip etme (başlama tarihi, pozisyon, unvan, ayrılma tarihi ve nedeni)

Envanter Yönetimi
Envanter ekleme, güncelleme, silme

Tipe, markaya, modele, seri numarasına veya duruma göre filtreleme

Envanter durumlarını takip etme (Personelde, Ofiste, Depoda)

Envanter tiplerini dinamik olarak yönetme

Zimmet İşlemleri
Envanteri personele zimmetleme

Zimmet ve iade tarihlerini takip etme

Teslim alma ve teslim etme işlemlerini yönetme

Aynı envanter için birden fazla aktif zimmetin önlenmesi

Kimlik Doğrulama ve Yetkilendirme
JWT + Refresh Token ile rol tabanlı erişim kontrolü

Farklı roller için güvenli endpoint yönetimi

Kullanıcı rolüne göre dinamik menü oluşturma

Gerçek Zamanlı Bildirimler
WebSocket + STOMP ile anlık bildirim sistemi

Yeni zimmet, iade ve önemli olaylarda bildirim

Merkezi Loglama
Logların yapılandırılmış şekilde Logstash’e gönderilmesi

Elasticsearch üzerinde saklama

Kibana ile analiz ve dashboard’lar

👥 Kullanıcı Rolleri
ADMIN – Tüm modül ve işlemlere tam erişim

IK (İnsan Kaynakları) – Personel ve zimmet yönetimi yapabilir

ENVANTER (Envanter Yönetimi) – Sadece envanter ve envanter tiplerini yönetebilir

🌍 Environment Variables

SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/hr
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=jwt_gizli_anahtar
JWT_EXPIRATION=3600000
REFRESH_TOKEN_EXPIRATION=604800000
LOGSTASH_HOST=logstash
LOGSTASH_PORT=5000

📊 Loglama Akışı (ELK)
Logback, logları TCP üzerinden (5000 portu) Logstash’e gönderir.

Logstash, logları işleyerek Elasticsearch’e iletir.

Kibana, hr-logs-* index pattern’i ile logları görselleştirir.

⚠️ Not  
Proje tam Docker kurulumu ile gelmemektedir.  
Sadece Elasticsearch ve Kibana Docker üzerinden çalışmaktadır.  
Uygulamayı başlatmak için backend ve frontend’i local ortamdan çalıştırın.  

Eğer backend’i de Docker üzerinden çalıştırmak isterseniz, proje içinde **Dockerfile** hazırdır.  
Bu durumda `application-dev.properties` ortamını seçmeniz gerekir.  

`docker-compose.yml` dosyasına aşağıdaki servisi ekleyerek backend’i Docker ile ayağa kaldırabilirsiniz:  

  app:
    build: .
    container_name: hr_app
    depends_on:
      - logstash
      - elasticsearch
    environment:
      SPRING_PROFILES_ACTIVE: dev
    ports:
      - "8080:8080"
    volumes:
      - "C:/Users/VivaVeste/OneDrive/Desktop/Pp:/app/uploads"
    networks:
      - elk

postgresql içinde docker da ayağa kaldırabilirsiniz fakat docker-compose.yml içine postgre sql ayarları yazmanız lazım


















