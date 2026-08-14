import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'US / Global' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'España / LATAM' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Deutschland' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: '日本' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', region: 'Brasil / Portugal' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Italia' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', region: '中国' },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Brand & Header
    'app.title': 'Baseline Wellness',
    'app.tagline': 'Unified Biometric Intelligence',
    'nav.platform': 'Platform',
    'nav.wearable_sync': 'Wearable Sync',
    'nav.science': 'Science & Insights',
    'nav.community': 'Community',
    'nav.compliance': 'Compliance & Trust',
    'nav.public_overview': 'Public Overview',
    'nav.member_hub': 'Member Hub',
    'nav.get_started': 'Get Started',
    'nav.switch_profile': 'Switch View / Profile',
    'nav.personal_vitals': 'My Personal Vitals',
    'nav.family_circle': 'Family Circle',
    'nav.add_family': 'Add Family Profile',
    'nav.active_devices': 'Devices Active',
    'nav.goal': 'Goal',
    'nav.viewing': 'Viewing',
    'nav.active': 'Active',
    'nav.alerts': 'Family Alerts',

    // Dashboard & Metrics
    'dashboard.title': 'Executive Health Vitals & Daily Readiness',
    'dashboard.last_sync': 'Last biometric sync',
    'dashboard.viewing_family': 'Viewing Family Member Data',
    'dashboard.return_to_mine': 'Return to my profile',
    'dashboard.customize_view': 'Customize Metrics',
    'dashboard.sim_alert': 'Simulate Metric Alert',
    'dashboard.readiness_score': 'Daily Readiness',
    'dashboard.optimal': 'Optimal State',
    'dashboard.moderate': 'Moderate Balance',
    'dashboard.depleted': 'Depleted / Recovery Needed',
    'dashboard.elevated': 'Elevated Strain',
    'dashboard.restorative': 'Deep Restorative',

    // Metric titles
    'metric.recovery_score': 'Daily Recovery Score',
    'metric.hrv_rmssd': 'Heart Rate Variability (HRV)',
    'metric.sleep_restorative': 'Restorative Sleep (Deep + REM)',
    'metric.stress_load': 'Daily Stress Load & Sympathetic Index',
    'metric.resting_hr': 'Resting Heart Rate (RHR)',
    'metric.daily_strain': 'Cumulative Cardiovascular Strain',
    'metric.spo2': 'Blood Oxygen (SpO2)',
    'metric.respiratory_rate': 'Basal Respiratory Rate',

    // Synthesis
    'synthesis.title': 'Daily Biometric Intelligence Synthesis',
    'synthesis.badge': 'Cross-Wearable Translation Engine',
    'synthesis.action_plan': 'Recommended Care Protocol',
    'synthesis.ask_ai': 'Ask Biometric Synthesis Assistant...',

    // Family
    'family.hub_title': 'Family Health Circle',
    'family.hub_subtitle': 'Real-time proactive monitoring & low biometric threshold protection for loved ones',
    'family.add_member': 'Add Family Member',
    'family.view_all_alerts': 'View Alert Center',
    'family.thresholds': 'Safety Alert Thresholds',
    'family.acknowledge': 'Acknowledge Alert',
    'family.acknowledge_all': 'Acknowledge All',
    'family.inspect_data': 'Inspect Live Dashboard',
    'family.care_protocol': 'Suggested Action',

    // Landing
    'hero.badge': 'Unified Cross-Wearable Biometric Translation',
    'hero.title_1': 'Make sense of your vitals.',
    'hero.title_2': 'Without the medical jargon.',
    'hero.desc': 'Baseline unifies your Apple Watch, Oura Ring, WHOOP, and Garmin into plain-language health intelligence and shared family care alerts.',
    'hero.cta_start': 'Start Unified Health Free',
    'hero.cta_demo': 'Explore Live Demo Dashboard',

    // Language Selector
    'lang.select': 'Select Language',
    'lang.current': 'Language',
    'lang.translator_ready': 'Automatic Multi-Language Engine Active',
  },

  es: {
    // Brand & Header
    'app.title': 'Baseline Wellness',
    'app.tagline': 'Inteligencia Biométrica Unificada',
    'nav.platform': 'Plataforma',
    'nav.wearable_sync': 'Sincronización',
    'nav.science': 'Ciencia y Análisis',
    'nav.community': 'Comunidad',
    'nav.compliance': 'Cumplimiento y Privacidad',
    'nav.public_overview': 'Vista Pública',
    'nav.member_hub': 'Panel de Miembro',
    'nav.get_started': 'Comenzar',
    'nav.switch_profile': 'Cambiar Perfil / Vista',
    'nav.personal_vitals': 'Mis Signos Vitales',
    'nav.family_circle': 'Círculo Familiar',
    'nav.add_family': 'Añadir Perfil Familiar',
    'nav.active_devices': 'Dispositivos Activos',
    'nav.goal': 'Objetivo',
    'nav.viewing': 'Viendo',
    'nav.active': 'Activo',
    'nav.alerts': 'Alertas Familiares',

    // Dashboard & Metrics
    'dashboard.title': 'Signos Vitales y Disposición Diaria',
    'dashboard.last_sync': 'Última sincronización biométrica',
    'dashboard.viewing_family': 'Viendo datos de familiar',
    'dashboard.return_to_mine': 'Volver a mi perfil',
    'dashboard.customize_view': 'Personalizar Métricas',
    'dashboard.sim_alert': 'Simular Alerta Biométrica',
    'dashboard.readiness_score': 'Disposición Diaria',
    'dashboard.optimal': 'Estado Óptimo',
    'dashboard.moderate': 'Equilibrio Moderado',
    'dashboard.depleted': 'Agotado / Requiere Recuperación',
    'dashboard.elevated': 'Sobrecarga Elevada',
    'dashboard.restorative': 'Reposo Restaurador',

    // Metric titles
    'metric.recovery_score': 'Puntuación de Recuperación Diaria',
    'metric.hrv_rmssd': 'Variabilidad de la Frecuencia Cardíaca (VFC)',
    'metric.sleep_restorative': 'Sueño Restaurador (Profundo + REM)',
    'metric.stress_load': 'Carga de Estrés Diario',
    'metric.resting_hr': 'Frecuencia Cardíaca en Reposo',
    'metric.daily_strain': 'Esfuerzo Cardiovascular Acumulado',
    'metric.spo2': 'Oxígeno en Sangre (SpO2)',
    'metric.respiratory_rate': 'Frecuencia Respiratoria Basal',

    // Synthesis
    'synthesis.title': 'Síntesis de Inteligencia Biométrica',
    'synthesis.badge': 'Motor de Traducción Multi-Dispositivo',
    'synthesis.action_plan': 'Protocolo de Cuidado Recomendado',
    'synthesis.ask_ai': 'Consultar con Asistente de Síntesis...',

    // Family
    'family.hub_title': 'Círculo de Salud Familiar',
    'family.hub_subtitle': 'Monitoreo proactivo en tiempo real y protección por umbrales biométricos bajos',
    'family.add_member': 'Añadir Familiar',
    'family.view_all_alerts': 'Centro de Alertas',
    'family.thresholds': 'Umbrales de Alerta de Seguridad',
    'family.acknowledge': 'Confirmar Alerta',
    'family.acknowledge_all': 'Confirmar Todas',
    'family.inspect_data': 'Inspeccionar Panel en Vivo',
    'family.care_protocol': 'Acción Sugerida',

    // Landing
    'hero.badge': 'Traducción Biométrica Multi-Dispositivo Unificada',
    'hero.title_1': 'Comprende tus signos vitales.',
    'hero.title_2': 'Sin tecnicismos médicos.',
    'hero.desc': 'Baseline unifica tu Apple Watch, Oura Ring, WHOOP y Garmin en análisis de salud claros y alertas familiares compartidas.',
    'hero.cta_start': 'Comenzar Gratis',
    'hero.cta_demo': 'Ver Demostración en Vivo',

    // Language Selector
    'lang.select': 'Seleccionar Idioma',
    'lang.current': 'Idioma',
    'lang.translator_ready': 'Motor de Traducción Multiidioma Activo',
  },

  fr: {
    // Brand & Header
    'app.title': 'Baseline Wellness',
    'app.tagline': 'Intelligence Biométrique Unifiée',
    'nav.platform': 'Plateforme',
    'nav.wearable_sync': 'Synchronisation',
    'nav.science': 'Science & Analyses',
    'nav.community': 'Communauté',
    'nav.compliance': 'Conformité & Confidentialité',
    'nav.public_overview': 'Aperçu Public',
    'nav.member_hub': 'Espace Membre',
    'nav.get_started': 'Commencer',
    'nav.switch_profile': 'Changer de Profil',
    'nav.personal_vitals': 'Mes Constantes Vitales',
    'nav.family_circle': 'Cercle Familial',
    'nav.add_family': 'Ajouter un Membre',
    'nav.active_devices': 'Appareils Actifs',
    'nav.goal': 'Objectif',
    'nav.viewing': 'Profil actuel',
    'nav.active': 'Actif',
    'nav.alerts': 'Alertes Famille',

    // Dashboard & Metrics
    'dashboard.title': 'Constantes Vitales et État de Forme',
    'dashboard.last_sync': 'Dernière synchronisation biométrique',
    'dashboard.viewing_family': 'Consultation des données du proche',
    'dashboard.return_to_mine': 'Revenir à mon profil',
    'dashboard.customize_view': 'Personnaliser les Métriques',
    'dashboard.sim_alert': 'Simuler une Alerte',
    'dashboard.readiness_score': 'Score de Forme Quotidien',
    'dashboard.optimal': 'État Optimal',
    'dashboard.moderate': 'Équilibre Modéré',
    'dashboard.depleted': 'Épuisé / Récupération Requise',
    'dashboard.elevated': 'Stress Élevé',
    'dashboard.restorative': 'Sommeil Réparateur',

    // Metric titles
    'metric.recovery_score': 'Score de Récupération Quotidien',
    'metric.hrv_rmssd': 'Variabilité de la Fréquence Cardiaque (VFC)',
    'metric.sleep_restorative': 'Sommeil Réparateur (Profond + Paradoxal)',
    'metric.stress_load': 'Charge de Stress Journalière',
    'metric.resting_hr': 'Fréquence Cardiaque au Repos',
    'metric.daily_strain': 'Charge Cardiovasculaire Cumulée',
    'metric.spo2': 'Oxygène Sanguin (SpO2)',
    'metric.respiratory_rate': 'Fréquence Respiratoire Basale',

    // Synthesis
    'synthesis.title': 'Synthèse Intelligente Biométrique',
    'synthesis.badge': 'Moteur de Traduction Multi-Capteurs',
    'synthesis.action_plan': 'Protocole de Soins Recommandé',
    'synthesis.ask_ai': 'Demander à l’Assistant de Synthèse...',

    // Family
    'family.hub_title': 'Cercle de Santé Familiale',
    'family.hub_subtitle': 'Surveillance proactive en temps réel & seuils de sécurité pour vos proches',
    'family.add_member': 'Ajouter un Proche',
    'family.view_all_alerts': 'Centre d’Alertes',
    'family.thresholds': 'Seuils de Sécurité',
    'family.acknowledge': 'Acquitter l’Alerte',
    'family.acknowledge_all': 'Tout Acquitter',
    'family.inspect_data': 'Examiner le Tableau de Bord',
    'family.care_protocol': 'Action Recommandée',

    // Landing
    'hero.badge': 'Traduction Biométrique Multi-Capteurs Unifiée',
    'hero.title_1': 'Comprenez enfin vos données vitales.',
    'hero.title_2': 'Sans le jargon médical complexe.',
    'hero.desc': 'Baseline rassemble Apple Watch, Oura Ring, WHOOP et Garmin en résumés clairs et alertes santé partagées en famille.',
    'hero.cta_start': 'Commencer Gratuitement',
    'hero.cta_demo': 'Explorer la Démo en Direct',

    // Language Selector
    'lang.select': 'Choisir la Langue',
    'lang.current': 'Langue',
    'lang.translator_ready': 'Moteur Multilingue Actif',
  },

  de: {
    // Brand & Header
    'app.title': 'Baseline Wellness',
    'app.tagline': 'Einheitliche Biometrische Intelligenz',
    'nav.platform': 'Plattform',
    'nav.wearable_sync': 'Wearable-Sync',
    'nav.science': 'Wissenschaft & Analyse',
    'nav.community': 'Community',
    'nav.compliance': 'Datenschutz & Konformität',
    'nav.public_overview': 'Übersicht',
    'nav.member_hub': 'Mitglieder-Hub',
    'nav.get_started': 'Jetzt Starten',
    'nav.switch_profile': 'Profil Wechseln',
    'nav.personal_vitals': 'Meine Vitalwerte',
    'nav.family_circle': 'Familien-Kreis',
    'nav.add_family': 'Familienmitglied Hinzufügen',
    'nav.active_devices': 'Aktive Geräte',
    'nav.goal': 'Ziel',
    'nav.viewing': 'Ansicht von',
    'nav.active': 'Aktiv',
    'nav.alerts': 'Familien-Warnungen',

    // Dashboard & Metrics
    'dashboard.title': 'Vitalparameter & Tägliche Einsatzbereitschaft',
    'dashboard.last_sync': 'Letzte Synchronisierung',
    'dashboard.viewing_family': 'Daten des Familienmitglieds',
    'dashboard.return_to_mine': 'Zurück zu meinem Profil',
    'dashboard.customize_view': 'Metriken Anpassen',
    'dashboard.sim_alert': 'Warnung Simulieren',
    'dashboard.readiness_score': 'Tagesbereitschaft',
    'dashboard.optimal': 'Optimaler Zustand',
    'dashboard.moderate': 'Ausgewogen',
    'dashboard.depleted': 'Erschöpft / Erholung Erforderlich',
    'dashboard.elevated': 'Erhöhte Belastung',
    'dashboard.restorative': 'Tiefe Regeneration',

    // Metric titles
    'metric.recovery_score': 'Täglicher Erholungswert',
    'metric.hrv_rmssd': 'Herzfrequenzvariabilität (HRV)',
    'metric.sleep_restorative': 'Erholsamer Schlaf (Tief- + REM-Schlaf)',
    'metric.stress_load': 'Tägliche Stressbelastung',
    'metric.resting_hr': 'Ruhepuls (RHR)',
    'metric.daily_strain': 'Kardiovaskuläre Gesamtbelastung',
    'metric.spo2': 'Blutsauerstoff (SpO2)',
    'metric.respiratory_rate': 'Basale Atemfrequenz',

    // Synthesis
    'synthesis.title': 'Biometrische Intelligenz-Synthese',
    'synthesis.badge': 'Geräteübergreifende Übersetzungs-Engine',
    'synthesis.action_plan': 'Empfohlenes Pflegeprotokoll',
    'synthesis.ask_ai': 'Biometrie-Assistenten fragen...',

    // Family
    'family.hub_title': 'Familien-Gesundheitskreis',
    'family.hub_subtitle': 'Echtzeit-Überwachung & Schwellenwert-Schutz für Ihre Familie',
    'family.add_member': 'Mitglied Hinzufügen',
    'family.view_all_alerts': 'Warnungs-Zentrale',
    'family.thresholds': 'Sicherheits-Grenzwerte',
    'family.acknowledge': 'Warnung Bestätigen',
    'family.acknowledge_all': 'Alle Bestätigen',
    'family.inspect_data': 'Live-Dashboard Prüfen',
    'family.care_protocol': 'Handlungsempfehlung',

    // Landing
    'hero.badge': 'Einheitliche Wearable-Biometrie-Übersetzung',
    'hero.title_1': 'Verstehen Sie Ihre Vitalwerte.',
    'hero.title_2': 'Ganz ohne medizinisches Fachchinesisch.',
    'hero.desc': 'Baseline bündelt Apple Watch, Oura, WHOOP und Garmin in verständlichen Gesundheitsberichten und gemeinsamen Familien-Warnungen.',
    'hero.cta_start': 'Kostenlos Starten',
    'hero.cta_demo': 'Live-Demo Erkunden',

    // Language Selector
    'lang.select': 'Sprache Wählen',
    'lang.current': 'Sprache',
    'lang.translator_ready': 'Mehrsprachige Übersetzungs-Engine Aktiv',
  },

  ja: {
    // Brand & Header
    'app.title': 'Baseline Wellness',
    'app.tagline': '統合バイオメトリック・インテリジェンス',
    'nav.platform': 'プラットフォーム',
    'nav.wearable_sync': 'ウェアラブル同期',
    'nav.science': '科学的分析と知見',
    'nav.community': 'コミュニティ',
    'nav.compliance': 'プライバシーと信頼',
    'nav.public_overview': '概要',
    'nav.member_hub': 'メンバーハブ',
    'nav.get_started': '今すぐ始める',
    'nav.switch_profile': 'プロファイル切り替え',
    'nav.personal_vitals': '個人のバイタル',
    'nav.family_circle': 'ファミリーサークル',
    'nav.add_family': '家族プロファイル追加',
    'nav.active_devices': '接続済みデバイス',
    'nav.goal': '目標',
    'nav.viewing': '表示中',
    'nav.active': 'アクティブ',
    'nav.alerts': '家族のアラート',

    // Dashboard & Metrics
    'dashboard.title': '生体バイタルと日次レディネス',
    'dashboard.last_sync': '最終バイオメトリック同期',
    'dashboard.viewing_family': '家族の生体データを閲覧中',
    'dashboard.return_to_mine': '自分のプロファイルに戻る',
    'dashboard.customize_view': 'メトリクス設定',
    'dashboard.sim_alert': 'アラートシミュレーション',
    'dashboard.readiness_score': 'デイリーレディネス',
    'dashboard.optimal': '最適状態',
    'dashboard.moderate': '適度なバランス',
    'dashboard.depleted': '消耗 / 回復が必要',
    'dashboard.elevated': '高負荷状態',
    'dashboard.restorative': '深い休息状態',

    // Metric titles
    'metric.recovery_score': '回復スコア',
    'metric.hrv_rmssd': '心拍変動 (HRV)',
    'metric.sleep_restorative': '回復睡眠 (深睡眠 + レム睡眠)',
    'metric.stress_load': '日常ストレス負荷',
    'metric.resting_hr': '安静時心拍数 (RHR)',
    'metric.daily_strain': '累積心血管負荷',
    'metric.spo2': '血中酸素濃度 (SpO2)',
    'metric.respiratory_rate': '基礎呼吸数',

    // Synthesis
    'synthesis.title': 'デイリー生体インテリジェンス要約',
    'synthesis.badge': 'マルチウェアラブル翻訳エンジン',
    'synthesis.action_plan': '推奨ケアプロトコル',
    'synthesis.ask_ai': '生体分析AIアシスタントに質問...',

    // Family
    'family.hub_title': '家族の健康見守りサークル',
    'family.hub_subtitle': '大切な家族のためのリアルタイムモニタリングと低下閾値アラート',
    'family.add_member': '家族を追加',
    'family.view_all_alerts': 'アラートセンター',
    'family.thresholds': '安全アラート閾値',
    'family.acknowledge': 'アラート確認',
    'family.acknowledge_all': 'すべて確認',
    'family.inspect_data': '詳細ダッシュボードを確認',
    'family.care_protocol': '推奨対応',

    // Landing
    'hero.badge': '統合ウェアラブルバイオメトリック翻訳',
    'hero.title_1': 'バイタルデータを分かりやすく。',
    'hero.title_2': '専門用語なしで健康を把握。',
    'hero.desc': 'BaselineはApple Watch、Oura Ring、WHOOP、Garminを統合し、わかりやすい健康分析と家族の見守りアラートを提供します。',
    'hero.cta_start': '無料で始める',
    'hero.cta_demo': 'デモダッシュボードを見る',

    // Language Selector
    'lang.select': '言語を選択',
    'lang.current': '言語',
    'lang.translator_ready': '多言語翻訳エンジン稼働中',
  },

  pt: {
    // Brand & Header
    'app.title': 'Baseline Wellness',
    'app.tagline': 'Inteligência Biométrica Unificada',
    'nav.platform': 'Plataforma',
    'nav.wearable_sync': 'Sincronização',
    'nav.science': 'Ciência e Insights',
    'nav.community': 'Comunidade',
    'nav.compliance': 'Conformidade e Confiança',
    'nav.public_overview': 'Visão Geral',
    'nav.member_hub': 'Painel do Membro',
    'nav.get_started': 'Começar Agora',
    'nav.switch_profile': 'Alternar Perfil',
    'nav.personal_vitals': 'Meus Sinais Vitais',
    'nav.family_circle': 'Círculo Familiar',
    'nav.add_family': 'Adicionar Membro da Família',
    'nav.active_devices': 'Dispositivos Ativos',
    'nav.goal': 'Objetivo',
    'nav.viewing': 'Visualizando',
    'nav.active': 'Ativo',
    'nav.alerts': 'Alertas da Família',

    // Dashboard & Metrics
    'dashboard.title': 'Sinais Vitais e Prontidão Diária',
    'dashboard.last_sync': 'Última sincronização biométrica',
    'dashboard.viewing_family': 'Visualizando dados de membro familiar',
    'dashboard.return_to_mine': 'Voltar ao meu perfil',
    'dashboard.customize_view': 'Personalizar Métricas',
    'dashboard.sim_alert': 'Simular Alerta',
    'dashboard.readiness_score': 'Prontidão Diária',
    'dashboard.optimal': 'Estado Ideal',
    'dashboard.moderate': 'Equilíbrio Moderado',
    'dashboard.depleted': 'Esgotado / Recuperação Necessária',
    'dashboard.elevated': 'Sobrecarga Elevada',
    'dashboard.restorative': 'Repouso Reparador',

    // Metric titles
    'metric.recovery_score': 'Pontuação de Recuperação',
    'metric.hrv_rmssd': 'Variabilidade da Frequência Cardíaca (VFC)',
    'metric.sleep_restorative': 'Sono Reparador (Profundo + REM)',
    'metric.stress_load': 'Carga de Estresse Diário',
    'metric.resting_hr': 'Frequência Cardíaca em Repouso',
    'metric.daily_strain': 'Esforço Cardiovascular Acumulado',
    'metric.spo2': 'Oxigênio no Sangue (SpO2)',
    'metric.respiratory_rate': 'Frequência Respiratória Basal',

    // Synthesis
    'synthesis.title': 'Síntese de Inteligência Biométrica',
    'synthesis.badge': 'Motor de Tradução Multi-Dispositivos',
    'synthesis.action_plan': 'Protocolo de Cuidados Recomendado',
    'synthesis.ask_ai': 'Perguntar ao Assistente de Síntese...',

    // Family
    'family.hub_title': 'Círculo de Saúde Familiar',
    'family.hub_subtitle': 'Monitoramento proativo em tempo real e proteção com limites biométricos mínimos',
    'family.add_member': 'Adicionar Familiar',
    'family.view_all_alerts': 'Central de Alertas',
    'family.thresholds': 'Limiares de Alerta de Segurança',
    'family.acknowledge': 'Confirmar Alerta',
    'family.acknowledge_all': 'Confirmar Todos',
    'family.inspect_data': 'Inspecionar Painel em Tempo Real',
    'family.care_protocol': 'Ação Sugerida',

    // Landing
    'hero.badge': 'Tradução Biométrica Multi-Dispositivo Unificada',
    'hero.title_1': 'Entenda seus sinais vitais.',
    'hero.title_2': 'Sem jargões médicos complicados.',
    'hero.desc': 'O Baseline unifica Apple Watch, Oura Ring, WHOOP e Garmin em relatórios claros e alertas de saúde para toda a família.',
    'hero.cta_start': 'Comece Gratuitamente',
    'hero.cta_demo': 'Ver Demonstração ao Vivo',

    // Language Selector
    'lang.select': 'Selecionar Idioma',
    'lang.current': 'Idioma',
    'lang.translator_ready': 'Motor de Tradução Multilíngue Ativo',
  },

  it: {
    // Brand & Header
    'app.title': 'Baseline Wellness',
    'app.tagline': 'Intelligenza Biometrica Unificata',
    'nav.platform': 'Piattaforma',
    'nav.wearable_sync': 'Sincronizzazione',
    'nav.science': 'Scienza e Approfondimenti',
    'nav.community': 'Comunità',
    'nav.compliance': 'Conformità e Privacy',
    'nav.public_overview': 'Panoramica',
    'nav.member_hub': 'Hub Utente',
    'nav.get_started': 'Inizia Ora',
    'nav.switch_profile': 'Cambia Profilo',
    'nav.personal_vitals': 'I Miei Parametri Vitali',
    'nav.family_circle': 'Cerchio Familiare',
    'nav.add_family': 'Aggiungi Profilo Familiare',
    'nav.active_devices': 'Dispositivi Attivi',
    'nav.goal': 'Obiettivo',
    'nav.viewing': 'Visualizzazione di',
    'nav.active': 'Attivo',
    'nav.alerts': 'Avvisi Famiglia',

    // Dashboard & Metrics
    'dashboard.title': 'Parametri Vitali e Prontezza Giornaliera',
    'dashboard.last_sync': 'Ultima sincronizzazione biometrica',
    'dashboard.viewing_family': 'Visualizzazione dati del familiare',
    'dashboard.return_to_mine': 'Torna al mio profilo',
    'dashboard.customize_view': 'Personalizza Metriche',
    'dashboard.sim_alert': 'Simula Avviso',
    'dashboard.readiness_score': 'Prontezza Giornaliera',
    'dashboard.optimal': 'Stato Ottimale',
    'dashboard.moderate': 'Equilibrio Moderato',
    'dashboard.depleted': 'Esaurito / Recupero Necessario',
    'dashboard.elevated': 'Sforzo Elevato',
    'dashboard.restorative': 'Riposo Rigenerante',

    // Metric titles
    'metric.recovery_score': 'Punteggio di Recupero',
    'metric.hrv_rmssd': 'Variabilità della Frequenza Cardiaca (HRV)',
    'metric.sleep_restorative': 'Sonno Rigenerante (Profondo + REM)',
    'metric.stress_load': 'Carico di Stress Giornaliero',
    'metric.resting_hr': 'Frequenza Cardiaca a Riposo',
    'metric.daily_strain': 'Sforzo Cardiovascolare Cumulativo',
    'metric.spo2': 'Ossigeno nel Sangue (SpO2)',
    'metric.respiratory_rate': 'Frequenza Respiratoria Basale',

    // Synthesis
    'synthesis.title': 'Sintesi di Intelligenza Biometrica',
    'synthesis.badge': 'Motore di Traduzione Multi-Dispositivo',
    'synthesis.action_plan': 'Protocollo di Cura Consigliato',
    'synthesis.ask_ai': 'Chiedi all’Assistente Biometrico...',

    // Family
    'family.hub_title': 'Cerchio di Salute Familiare',
    'family.hub_subtitle': 'Monitoraggio proattivo in tempo reale e protezione con soglie di sicurezza per i propri cari',
    'family.add_member': 'Aggiungi Familiare',
    'family.view_all_alerts': 'Centro Avvisi',
    'family.thresholds': 'Soglie di Allerta di Sicurezza',
    'family.acknowledge': 'Conferma Avviso',
    'family.acknowledge_all': 'Conferma Tutti',
    'family.inspect_data': 'Esamina Dashboard Live',
    'family.care_protocol': 'Azione Consigliata',

    // Landing
    'hero.badge': 'Traduzione Biometrica Multi-Dispositivo Unificata',
    'hero.title_1': 'Comprendi i tuoi parametri vitali.',
    'hero.title_2': 'Senza gergo medico complicato.',
    'hero.desc': 'Baseline unifica Apple Watch, Oura, WHOOP e Garmin in approfondimenti chiari e avvisi di salute per la famiglia.',
    'hero.cta_start': 'Inizia Gratuitamente',
    'hero.cta_demo': 'Esplora la Demo Live',

    // Language Selector
    'lang.select': 'Seleziona Lingua',
    'lang.current': 'Lingua',
    'lang.translator_ready': 'Motore di Traduzione Multilingue Attivo',
  },

  zh: {
    // Brand & Header
    'app.title': 'Baseline Wellness',
    'app.tagline': '统一生物特征智能平台',
    'nav.platform': '平台总览',
    'nav.wearable_sync': '设备同步',
    'nav.science': '科学与洞察',
    'nav.community': '健康社区',
    'nav.compliance': '合规与隐私',
    'nav.public_overview': '公共概览',
    'nav.member_hub': '会员健康中心',
    'nav.get_started': '立即开启',
    'nav.switch_profile': '切换个人/家庭视图',
    'nav.personal_vitals': '我的健康体征',
    'nav.family_circle': '家庭健康圈',
    'nav.add_family': '添加家庭成员',
    'nav.active_devices': '已连接设备',
    'nav.goal': '目标',
    'nav.viewing': '当前查看',
    'nav.active': '当前',
    'nav.alerts': '家庭健康预警',

    // Dashboard & Metrics
    'dashboard.title': '核心体征与每日身体就绪度',
    'dashboard.last_sync': '最近一次生物体征同步',
    'dashboard.viewing_family': '正在查看家庭成员体征数据',
    'dashboard.return_to_mine': '返回我的个人档案',
    'dashboard.customize_view': '自定义指标',
    'dashboard.sim_alert': '模拟健康预警',
    'dashboard.readiness_score': '每日就绪度评分',
    'dashboard.optimal': '最佳恢复状态',
    'dashboard.moderate': '中度平衡',
    'dashboard.depleted': '体能透支 / 亟需休息',
    'dashboard.elevated': '压力负荷偏高',
    'dashboard.restorative': '深度深度修复',

    // Metric titles
    'metric.recovery_score': '每日恢复评分',
    'metric.hrv_rmssd': '心率变异性 (HRV)',
    'metric.sleep_restorative': '修复性睡眠 (深睡 + REM)',
    'metric.stress_load': '全天交感压力负荷',
    'metric.resting_hr': '静息心率 (RHR)',
    'metric.daily_strain': '累积心血管负荷',
    'metric.spo2': '血氧饱和度 (SpO2)',
    'metric.respiratory_rate': '基础呼吸频率',

    // Synthesis
    'synthesis.title': '每日生物智能健康通报',
    'synthesis.badge': '跨穿戴设备通俗翻译引擎',
    'synthesis.action_plan': '建议关怀与恢复方案',
    'synthesis.ask_ai': '向智能体征助手提问...',

    // Family
    'family.hub_title': '家庭健康守护圈',
    'family.hub_subtitle': '为长辈与挚爱亲人提供实时健康监测与低体征指标预警守护',
    'family.add_member': '添加家庭成员',
    'family.view_all_alerts': '预警中心',
    'family.thresholds': '安全预警阈值',
    'family.acknowledge': '确认知悉',
    'family.acknowledge_all': '全部确认',
    'family.inspect_data': '查看实时体征看板',
    'family.care_protocol': '建议关怀措施',

    // Landing
    'hero.badge': '统一跨穿戴设备生物体征转译',
    'hero.title_1': '读懂你的身体信号。',
    'hero.title_2': '告别复杂的医疗术语。',
    'hero.desc': 'Baseline 整合 Apple Watch、Oura Ring、WHOOP 与 Garmin，将复杂数据转译为通俗易懂的每日健康建议与家庭关爱预警。',
    'hero.cta_start': '免费体验',
    'hero.cta_demo': '探索实时演示看板',

    // Language Selector
    'lang.select': '选择语言',
    'lang.current': '语言',
    'lang.translator_ready': '多语言翻译引擎已就绪',
  },
};

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguageOption: LanguageOption;
  availableLanguages: LanguageOption[];
  t: (key: string, defaultText?: string) => string;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('baseline_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [isTranslating, setIsTranslating] = useState(false);

  const setLanguage = (lang: LanguageCode) => {
    setIsTranslating(true);
    setCurrentLanguageState(lang);
    try {
      localStorage.setItem('baseline_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsTranslating(false);
    }, 200);
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const t = (key: string, defaultText?: string): string => {
    const langDict = TRANSLATIONS[currentLanguage] || TRANSLATIONS['en'];
    if (langDict[key]) {
      return langDict[key];
    }
    const enDict = TRANSLATIONS['en'];
    if (enDict[key]) {
      return enDict[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        currentLanguageOption,
        availableLanguages: SUPPORTED_LANGUAGES,
        t,
        isTranslating,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
