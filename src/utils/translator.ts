import { LanguageCode } from '../types';
import { COMPREHENSIVE_TRANSLATIONS } from '../data/translations';

// Comprehensive phrase and sentence dictionaries for deep text translation
export const DYNAMIC_PHRASES: Record<LanguageCode, Record<string, string>> = {
  en: {},
  es: {
    // Daily Synthesis Narrative
    'Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated +15.2% above baseline with a resting heart rate of 51 bpm.':
      'Tu sistema nervioso autónomo demostró una sólida recuperación parasimpática durante el sueño. La VFC nocturna (rMSSD) aumentó un +15.2% sobre la línea base con una frecuencia cardíaca en reposo de 51 lpm.',
    'Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.':
      'Fisiológicamente preparado para tareas cognitivas exigentes o entrenamientos de resistencia en Zona 3-4.',
    'Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.':
      'La sensibilidad al estrés simpático es baja. Ventana de concentración esperada: 9:00 AM – 1:30 PM.',
    'To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.':
      'Para conservar este impulso de recuperación, inicia la desconexión de pantallas antes de las 10:15 PM.',
    'Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.':
      'Descubre correlaciones de varias semanas entre el consumo de cafeína, la latencia del sueño y los picos de VFC.',
    'Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.':
      'Las puntuaciones de preparación y análisis biométricos reflejan tendencias de recuperación fisiológica y no son diagnósticos médicos.',
    'Unified from Garmin Connect & Oura Ring': 'Unificado desde Garmin Connect y Oura Ring',
    'Unified from Apple Health & WHOOP': 'Unificado desde Apple Health y WHOOP',
    'Unified from Oura Ring Gen 3 & Apple Health': 'Unificado desde Oura Ring Gen 3 y Apple Health',
    'Unified from Apple Watch Series 9 & Withings': 'Unificado desde Apple Watch Series 9 y Withings',
    
    // Metric Plain Insights & Guidance
    'Your autonomic nervous system is in a receptive, primed state. Parasympathetic tone dominated your overnight recovery window.':
      'Tu sistema nervioso autónomo está en un estado óptimo y receptivo. El tono parasimpático predominó durante tu recuperación nocturna.',
    'High physiological capacity today. Ideal window for demanding cognitive tasks or higher intensity physical exertion.':
      'Alta capacidad fisiológica hoy. Ventana ideal para tareas cognitivas exigentes o mayor esfuerzo físico.',
    'Your beat-to-beat variability is elevated above your 30-day baseline, indicating minimal systemic inflammation or acute fatigue.':
      'Tu variabilidad latido a latido está por encima del promedio de 30 días, lo que indica mínima inflamación o fatiga aguda.',
    'Your resilience bandwidth is wide today. You can absorb moderate cognitive or physical stress without overtaxing reserves.':
      'Tu capacidad de resiliencia es amplia hoy. Puedes afrontar estrés moderado sin agotar tus reservas.',
    'You logged 2h 15m of Deep + REM sleep (34% of total sleep time), well within the optimal restorative band for neuroplasticity.':
      'Registraste 2h 15m de sueño Profundo + REM (34% del sueño total), en el rango óptimo de restauración cerebral.',
    'Consistent sleep onset timing helped stabilize your circadian anchor. Aim to maintain the same wind-down routine tonight.':
      'La regularidad al dormir estabilizó tu reloj circadiano. Mantén la misma rutina de relajación esta noche.',
    'Sympathetic arousal episodes were brief and followed by prompt recovery dips. Your nervous system spent 64% of the day in restorative states.':
      'Los episodios de estrés simpático fueron breves y seguidos de rápida recuperación. Pasaste el 64% del día en estado restaurador.',
    'You have managed daily micro-stressors with calm equilibrium. Taking 5 minutes of resonant breathing at 3 PM will maintain this trajectory.':
      'Has gestionado los estresores diarios con equilibrio. Realizar 5 minutos de respiración a las 3 PM mantendrá esta tendencia.',
    'Overnight minimum reached 51 bpm at 3:45 AM, showing strong cardiac recovery during Slow-Wave Sleep.':
      'El mínimo nocturno fue de 51 lpm a las 3:45 AM, demostrando una excelente recuperación cardíaca en el sueño profundo.',
    'Cardiovascular load was moderate and well-balanced against your restorative sleep foundation.':
      'La carga cardiovascular fue moderada y equilibrada frente a tu descanso restaurador.',
    'Blood oxygen saturation remained stable at 97.8% without notable nocturnal desaturation dips.':
      'La saturación de oxígeno en sangre se mantuvo estable en 97.8% sin caídas nocturnas significativas.',
    'Nocturnal breathing frequency was rock steady at 13.8 breaths/min, matching your healthy baseline.':
      'La frecuencia respiratoria nocturna se mantuvo estable en 13.8 resp/min, coincidiendo con tu línea base.',

    // Family Circle Alerts
    'Prolonged Low HRV & Elevated Resting HR': 'VFC Baja Prolongada y Frecuencia Cardíaca Elevada',
    'Continuous 3-night decline in HRV (22ms vs baseline 38ms) coupled with elevated resting pulse (68 bpm vs 56 bpm).':
      'Descenso continuo durante 3 noches en la VFC (22ms vs base 38ms) junto con pulso elevado en reposo (68 lpm vs 56 lpm).',
    'Consider calling Eleanor to suggest a gentle hydration check-in and light walking rather than demanding tasks.':
      'Considera llamar a Eleanor para sugerirle hidratación y un paseo suave en lugar de actividades exigentes.',
    'SpO2 Nocturnal Dip Below Threshold': 'Descenso Nocturno de SpO2 por Debajo del Umbral',
    'SpO2 dipped to 91% for 14 minutes during sleep cycle (threshold: 92%).':
      'La SpO2 bajó al 91% durante 14 minutos en el ciclo de sueño (umbral de seguridad: 92%).',
    'Check bedroom humidity and ventilation; verify if Arthur experienced mild congestion.':
      'Revisa la ventilación y humedad de la habitación; consulta si Arthur presentó congestión.',

    // Relationships & Roles
    'Spouse': 'Cónyuge',
    'Mother': 'Madre',
    'Father': 'Padre',
    'Grandmother': 'Abuela',
    'Grandfather': 'Abuelo',
    'Daughter': 'Hija',
    'Son': 'Hijo',
    'Sibling': 'Hermano/a',
    'Partner': 'Pareja',
    'Caregiver': 'Cuidador',
  },
  fr: {
    // Daily Synthesis Narrative
    'Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated +15.2% above baseline with a resting heart rate of 51 bpm.':
      'Votre système nerveux autonome a montré une solide récupération parasympathique pendant le sommeil. La VFC nocturne (rMSSD) a progressé de +15,2% par rapport à votre moyenne avec un pouls au repos de 51 bpm.',
    'Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.':
      'Physiologiquement prêt pour des tâches cognitives intenses ou un effort d’endurance en Zone 3-4.',
    'Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.':
      'Sensibilité au stress sympathique faible. Période de concentration optimale : 9h00 – 13h30.',
    'To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.':
      'Pour préserver cette récupération, réduisez l’exposition aux écrans d’ici 22h15.',
    'Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.':
      'Découvrez les corrélations sur plusieurs semaines entre caféine, endormissement et pics de VFC.',
    'Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.':
      'Les scores de forme et analyses reflètent des tendances de récupération et ne constituent pas un diagnostic médical.',
    'Unified from Garmin Connect & Oura Ring': 'Unifié depuis Garmin Connect et Oura Ring',
    'Unified from Apple Health & WHOOP': 'Unifié depuis Apple Health et WHOOP',
    'Unified from Oura Ring Gen 3 & Apple Health': 'Unifié depuis Oura Ring Gen 3 et Apple Health',
    'Unified from Apple Watch Series 9 & Withings': 'Unifié depuis Apple Watch Series 9 et Withings',

    // Metric Plain Insights
    'Your autonomic nervous system is in a receptive, primed state. Parasympathetic tone dominated your overnight recovery window.':
      'Votre système nerveux autonome est dans un état optimal et réceptif. Le tonus parasympathique a dominé votre nuit.',
    'High physiological capacity today. Ideal window for demanding cognitive tasks or higher intensity physical exertion.':
      'Forte capacité physiologique aujourd’hui. Moment idéal pour un travail intellectuel exigeant ou un effort physique soutenu.',
    'Your beat-to-beat variability is elevated above your 30-day baseline, indicating minimal systemic inflammation or acute fatigue.':
      'Votre variabilité cardiaque est au-dessus de votre moyenne à 30 jours, signe d’une inflammation minime et d’une bonne forme.',
    'Your resilience bandwidth is wide today. You can absorb moderate cognitive or physical stress without overtaxing reserves.':
      'Votre réserve de résilience est large aujourd’hui. Vous pouvez absorber un stress modéré sans épuiser vos réserves.',
    'You logged 2h 15m of Deep + REM sleep (34% of total sleep time), well within the optimal restorative band for neuroplasticity.':
      'Vous avez cumulé 2h 15m de sommeil profond + paradoxal (34% du total), parfait pour la régénération et la plasticité neuronale.',
    'Consistent sleep onset timing helped stabilize your circadian anchor. Aim to maintain the same wind-down routine tonight.':
      'La régularité du coucher a stabilisé votre rythme circadien. Maintenez ce rituel ce soir.',

    // Relationships & Roles
    'Spouse': 'Conjoint(e)',
    'Mother': 'Mère',
    'Father': 'Père',
    'Grandmother': 'Grand-mère',
    'Grandfather': 'Grand-père',
    'Daughter': 'Fille',
    'Son': 'Fils',
    'Sibling': 'Frère / Sœur',
    'Partner': 'Partenaire',
    'Caregiver': 'Aidant(e)',
  },
  de: {
    // Daily Synthesis Narrative
    'Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated +15.2% above baseline with a resting heart rate of 51 bpm.':
      'Ihr vegetatives Nervensystem zeigte im Schlaf eine starke parasympathische Erholung. Die nächtliche HRV (rMSSD) stieg um +15,2% über den Basiswert bei einem Ruhepuls von 51 bpm.',
    'Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.':
      'Physiologisch bereit für anspruchsvolle kognitive Aufgaben oder Ausdauer in Zone 3–4.',
    'Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.':
      'Sympathische Stressempfindlichkeit ist niedrig. Optimales Fokusfenster: 09:00 – 13:30 Uhr.',
    'To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.':
      'Um die Erholungsdynamik zu wahren, beenden Sie die Bildschirmnutzung bis 22:15 Uhr.',
    'Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.':
      'Erkennen Sie Zusammenhänge zwischen Kaffeekonsum, Einschlafzeit und HRV-Werten.',
    'Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.':
      'Einsatzbereitschaftswerte spiegeln physiologische Erholungstrends wider und sind keine klinischen Diagnosen.',
    'Unified from Garmin Connect & Oura Ring': 'Zusammengeführt aus Garmin Connect & Oura Ring',
    'Unified from Apple Health & WHOOP': 'Zusammengeführt aus Apple Health & WHOOP',

    // Relationships & Roles
    'Spouse': 'Ehepartner(in)',
    'Mother': 'Mutter',
    'Father': 'Vater',
    'Grandmother': 'Großmutter',
    'Grandfather': 'Großvater',
    'Daughter': 'Tochter',
    'Son': 'Sohn',
    'Sibling': 'Geschwister',
    'Partner': 'Partner(in)',
    'Caregiver': 'Betreuer(in)',
  },
  ja: {
    // Daily Synthesis Narrative
    'Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated +15.2% above baseline with a resting heart rate of 51 bpm.':
      '睡眠サイクル全体を通して副交感神経の十分な回復が確認されました。夜間の心拍変動 (rMSSD) はベースラインを +15.2% 上回り、安静時心拍数は 51 bpm でした。',
    'Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.':
      '高い集中力を要する作業や、Zone 3〜4の持久力トレーニングに適した良好な状態です。',
    'Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.':
      '交感神経の過敏性は低く安定しています。最適な集中時間帯: 9:00〜13:30。',
    'To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.':
      'この回復力を維持するため、22:15までに画面の光を控えリラックスしましょう。',
    'Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.':
      'カフェイン摂取タイミング、入眠潜時、HRVの変動の相関関係を発見します。',
    'Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.':
      'レディネススコアおよび生体データ分析は日々の回復傾向を示すものであり、医療上の診断ではありません。',
    'Unified from Garmin Connect & Oura Ring': 'Garmin Connect と Oura Ring から統合',
    'Unified from Apple Health & WHOOP': 'Apple Health と WHOOP から統合',

    // Relationships & Roles
    'Spouse': '配偶者',
    'Mother': '母',
    'Father': '父',
    'Grandmother': '祖母',
    'Grandfather': '祖父',
    'Daughter': '娘',
    'Son': '息子',
    'Sibling': '兄弟・姉妹',
    'Partner': 'パートナー',
    'Caregiver': '介護者',
  },
  pt: {
    'Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated +15.2% above baseline with a resting heart rate of 51 bpm.':
      'Seu sistema nervoso autônomo demonstrou forte recuperação parassimpática durante o sono. A VFC noturna (rMSSD) aumentou +15.2% acima da média basal com FC de repouso em 51 bpm.',
    'Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.':
      'Fisiologicamente preparado para tarefas cognitivas de alta demanda ou treinos em Zona 3-4.',
    'Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.':
      'Sensibilidade ao estresse simpático baixa. Janela de foco esperada: 9:00 – 13:30.',
    'To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.':
      'Para manter essa recuperação, inicie o desligamento de telas até as 22:15.',
    'Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.':
      'Descubra correlações entre horário de cafeína, latência do sono e picos de VFC.',
    'Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.':
      'Pontuações de prontidão e insights refletem tendências fisiológicas de recuperação e não são diagnósticos clínicos.',
    'Unified from Garmin Connect & Oura Ring': 'Unificado de Garmin Connect e Oura Ring',
    'Unified from Apple Health & WHOOP': 'Unificado de Apple Health e WHOOP',
    
    // Relationships & Roles
    'Spouse': 'Cônjuge',
    'Mother': 'Mãe',
    'Father': 'Pai',
    'Grandmother': 'Avó',
    'Grandfather': 'Avô',
    'Daughter': 'Filha',
    'Son': 'Filho',
    'Sibling': 'Irmão / Irmã',
    'Partner': 'Parceiro(a)',
    'Caregiver': 'Cuidador(a)',
  },
  it: {
    'Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated +15.2% above baseline with a resting heart rate of 51 bpm.':
      'Il tuo sistema nervoso autonomo ha mostrato un solido recupero parasimpatico durante il sonno. L’HRV notturno (rMSSD) è salito del +15,2% sopra il valore base con frequenza a riposo di 51 bpm.',
    'Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.':
      'Fisiologicamente pronto per compiti cognitivi impegnativi o allenamenti in Zona 3-4.',
    'Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.':
      'Sensibilità allo stress simpatico bassa. Finestra di concentrazione ideale: 9:00 – 13:30.',
    'To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.':
      'Per preservare questo recupero, riduci gli schermi entro le 22:15.',
    'Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.':
      'Scopri correlazioni tra caffeina, tempo di addormentamento e picchi di HRV.',
    'Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.':
      'I punteggi di prontezza riflettono tendenze di recupero fisiologico e non costituiscono diagnosi cliniche.',
    'Unified from Garmin Connect & Oura Ring': 'Unificato da Garmin Connect e Oura Ring',
    'Unified from Apple Health & WHOOP': 'Unificato da Apple Health e WHOOP',

    // Relationships & Roles
    'Spouse': 'Coniuge',
    'Mother': 'Madre',
    'Father': 'Padre',
    'Grandmother': 'Nonna',
    'Grandfather': 'Nonno',
    'Daughter': 'Figlia',
    'Son': 'Figlio',
    'Sibling': 'Fratello / Sorella',
    'Partner': 'Partner',
    'Caregiver': 'Assistente / Caregiver',
  },
  zh: {
    'Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated +15.2% above baseline with a resting heart rate of 51 bpm.':
      '您的自主神经系统在整个睡眠周期中表现出良好的副交感神经恢复。夜间心率变异性 (rMSSD) 较基准线提升 +15.2%，静息心率为 51 次/分。',
    'Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.':
      '生理状态极佳，适合进行高强度专注思考或 Zone 3-4 的耐力运动。',
    'Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.':
      '交感神经压力敏感度低。建议高效专注时间窗口：上午 9:00 – 下午 1:30。',
    'To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.':
      '为维持良好的恢复趋势，建议在今晚 22:15 前减少屏幕蓝光暴露。',
    'Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.':
      '深入发现咖啡因摄入时间、入睡潜伏期与心率变异性波动之间的深层联系。',
    'Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.':
      '就绪度评分与生物指标反映身体生理恢复趋势，非临床诊断依据。',
    'Unified from Garmin Connect & Oura Ring': '已整合 Garmin Connect 与 Oura Ring 数据',
    'Unified from Apple Health & WHOOP': '已整合 Apple Health 与 WHOOP 数据',
    'Unified from Oura Ring Gen 3 & Apple Health': '已整合 Oura Ring Gen 3 与 Apple Health 数据',
    'Unified from Apple Watch Series 9 & Withings': '已整合 Apple Watch Series 9 与 Withings 数据',

    // Metric Plain Insights
    'Your autonomic nervous system is in a receptive, primed state. Parasympathetic tone dominated your overnight recovery window.':
      '您的自主神经系统处于良好的恢复状态，夜间以副交感神经修复为主导。',
    'High physiological capacity today. Ideal window for demanding cognitive tasks or higher intensity physical exertion.':
      '今日生理体能储备充沛，适合高强度脑力工作或适量强化锻炼。',
    'Your beat-to-beat variability is elevated above your 30-day baseline, indicating minimal systemic inflammation or acute fatigue.':
      '您的逐搏心率变异度高于30天基线，表明身体无急性疲劳与炎症负担。',
    'Your resilience bandwidth is wide today. You can absorb moderate cognitive or physical stress without overtaxing reserves.':
      '今日身心韧性带宽充足，能从容应对日常工作与适度压力。',
    'You logged 2h 15m of Deep + REM sleep (34% of total sleep time), well within the optimal restorative band for neuroplasticity.':
      '深睡与快速眼动睡眠共计 2小时15分（占总睡眠34%），处于极佳的神经修复区间。',
    'Consistent sleep onset timing helped stabilize your circadian anchor. Aim to maintain the same wind-down routine tonight.':
      '稳定的入睡时间帮助锚定了昼夜节律，建议今晚保持一致的睡前放松流程。',
    'Sympathetic arousal episodes were brief and followed by prompt recovery dips. Your nervous system spent 64% of the day in restorative states.':
      '日间交感神经激活短暂且迅速恢复，64%的时间处于平稳修复状态。',
    'You have managed daily micro-stressors with calm equilibrium. Taking 5 minutes of resonant breathing at 3 PM will maintain this trajectory.':
      '日常压力应对平稳从容。建议下午3点进行5分钟共振深呼吸以延续良好状态。',

    // Relationships & Roles
    'Spouse': '配偶',
    'Mother': '母亲',
    'Father': '父亲',
    'Grandmother': '祖母 / 外婆',
    'Grandfather': '祖父 / 外公',
    'Daughter': '女儿',
    'Son': '儿子',
    'Sibling': '兄弟姐妹',
    'Partner': '伴侣',
    'Caregiver': '照护人',
  },
};

/**
 * Universal text translation helper that:
 * 1. Checks exact match in COMPREHENSIVE_TRANSLATIONS dictionary by key
 * 2. Checks exact match in DYNAMIC_PHRASES by English source text
 * 3. Falls back smoothly if string is in English or unsupported
 */
export function translateText(
  text: string,
  targetLang: LanguageCode,
  keyFallback?: string
): string {
  if (!text || targetLang === 'en') {
    return text;
  }

  // 1. Try Key-based lookup
  if (keyFallback && COMPREHENSIVE_TRANSLATIONS[targetLang]?.[keyFallback]) {
    return COMPREHENSIVE_TRANSLATIONS[targetLang][keyFallback];
  }

  // 2. Try exact dynamic phrase lookup
  const phrases = DYNAMIC_PHRASES[targetLang];
  if (phrases && phrases[text]) {
    return phrases[text];
  }

  // 3. Try reverse key lookup in English dictionary
  const enDict = COMPREHENSIVE_TRANSLATIONS['en'];
  for (const [key, val] of Object.entries(enDict)) {
    if (val.trim().toLowerCase() === text.trim().toLowerCase()) {
      if (COMPREHENSIVE_TRANSLATIONS[targetLang]?.[key]) {
        return COMPREHENSIVE_TRANSLATIONS[targetLang][key];
      }
    }
  }

  // 4. Word-by-word / status replacements
  const lower = text.toLowerCase().trim();
  if (lower === 'optimal') {
    return COMPREHENSIVE_TRANSLATIONS[targetLang]?.['dashboard.optimal'] || text;
  }
  if (lower === 'moderate') {
    return COMPREHENSIVE_TRANSLATIONS[targetLang]?.['dashboard.moderate'] || text;
  }
  if (lower === 'depleted') {
    return COMPREHENSIVE_TRANSLATIONS[targetLang]?.['dashboard.depleted'] || text;
  }
  if (lower === 'elevated') {
    return COMPREHENSIVE_TRANSLATIONS[targetLang]?.['dashboard.elevated'] || text;
  }
  if (lower === 'restorative') {
    return COMPREHENSIVE_TRANSLATIONS[targetLang]?.['dashboard.restorative'] || text;
  }

  return text;
}
