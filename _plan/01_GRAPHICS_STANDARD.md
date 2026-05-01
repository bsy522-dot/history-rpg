# 01_GRAPHICS_STANDARD — 시각 표준 (그래픽 일관성 규칙)

> **목적**: "그래픽 퇴화 말고 동일성 유지하면서 만들어봐" — 병석님 지시.
> 모든 씬·모듈은 본 표준 통과 후 머지.

---

## 1. 엔진 고정

| 항목 | 값 | 비고 |
|------|-----|------|
| 렌더러 | Three.js r160 WebGLRenderer | 2D Canvas 금지 (UI HUD 제외) |
| antialias | `true` | 필수 |
| shadowMap | `PCFSoftShadowMap` | squad-3d 기준 |
| toneMapping | `ACESFilmicToneMapping` | 3d.html 기준, 신화 톤 |
| toneMappingExposure | 1.0 | |
| outputColorSpace | `SRGBColorSpace` | r160 기본 |
| pixelRatio | `min(devicePixelRatio, 2)` | 모바일 배터리 절약 |

---

## 2. 조명 프리셋 (씬별)

### 2-1. 전투 씬 — "일몰 신성"
```javascript
const ambient = new THREE.AmbientLight(0xffeedd, 0.55);  // ★ fullloop-3d의 0.35 금지
const sun = new THREE.DirectionalLight(0xffaa66, 1.1);
sun.position.set(10, 20, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const hemi = new THREE.HemisphereLight(0xffaa77, 0x332211, 0.35);
```

### 2-2. 마을 씬 — "낮 햇살"
```javascript
const ambient = new THREE.AmbientLight(0xffffff, 0.7);
const sun = new THREE.DirectionalLight(0xfff2cc, 1.0);
sun.position.set(15, 25, 10);
```

### 2-3. 보스/엔딩 씬 — "황금 드라마"
```javascript
const ambient = new THREE.AmbientLight(0xffe4a0, 0.45);
const key = new THREE.DirectionalLight(0xffd56a, 1.4);
const rim = new THREE.DirectionalLight(0x6a8aff, 0.4);  // 림라이트
```

**금지**: AmbientLight 0.35 이하. 씬이 어두워져 퇴화 인상.

---

## 3. 재질 팔레트 (통일)

```javascript
const MAT = {
  skin:      new THREE.MeshStandardMaterial({color:0xd0a080, roughness:0.7}),
  armor:     new THREE.MeshStandardMaterial({color:0xb5651d, roughness:0.45, metalness:0.55}),
  armorEnemy:new THREE.MeshStandardMaterial({color:0x3a3a3a, roughness:0.6, metalness:0.7}),
  cloth:     new THREE.MeshStandardMaterial({color:0x8a6a3a, roughness:0.85}),
  leather:   new THREE.MeshStandardMaterial({color:0x5a3a1a, roughness:0.8}),
  bronze:    new THREE.MeshStandardMaterial({color:0xcd7f32, roughness:0.2, metalness:0.9}),
  wood:      new THREE.MeshStandardMaterial({color:0x6b4226, roughness:0.9}),
  stone:     new THREE.MeshStandardMaterial({color:0x7a7a7a, roughness:0.95}),
  grass:     new THREE.MeshStandardMaterial({color:0x4a7030, roughness:0.9}),
  path:      new THREE.MeshStandardMaterial({color:0x9a8060, roughness:0.85}),
  water:     new THREE.MeshStandardMaterial({color:0x3a6aa0, roughness:0.2, metalness:0.1, transparent:true, opacity:0.85}),
  flag_ally: new THREE.MeshStandardMaterial({color:0xffd700, emissive:0x442200, emissiveIntensity:0.2}),
  flag_enemy:new THREE.MeshStandardMaterial({color:0x8a2020, emissive:0x220000, emissiveIntensity:0.15}),
};
```

**절대 금지**:
- `MeshBasicMaterial` (무조명 → 납작해 보임)
- 원색 단독 (빨강·파랑·노랑 순색) — 팔레트 외 색상 금지
- 텍스처 없는 단일 색상 + 0 metalness + 1 roughness (플라스틱 느낌)

---

## 4. 폴리곤 해상도 최소 기준

| 부품 | 최소 세그먼트 | 이유 |
|------|--------------|------|
| 캐릭터 머리 (Sphere) | `(12, 10)` | 각진 얼굴 방지 |
| 캐릭터 몸통 | `BoxGeometry` OK | |
| 캐릭터 다리/팔 (Cylinder) | `8` 이상 | 5면체 금지 (fullloop-3d 문제) |
| 투구 (Cone) | `10` 이상 | 6각 금지 |
| 찰갑 비늘 (Circle) | `8` 이상 | 5각 금지 |
| 타일 Box | 높이 `0.2` 이상 | 0.1 납작금지 |
| 나무 잎 (Sphere) | `(10, 8)` | |

---

## 5. 캐릭터 규격

```
[ 표준 캐릭터 파츠 ]
- 다리 2개:  Cylinder(r=0.05, h=0.22, seg=8)  · cloth 재질
- 몸통:      Box(0.28, 0.34, 0.20)           · armor 재질
- 팔 2개:    Cylinder(r=0.04, h=0.24, seg=8)  · armor 재질
- 머리:      Sphere(r=0.11, seg=12,10)        · skin 재질
- 투구:      Cone(r=0.07, h=0.08, seg=10)     · bronze 재질 (리더만)
- 비파형동검:ExtrudeGeometry (shape 정의)     · bronze 재질
- 방패:      ExtrudeGeometry (원형)           · wood+bronze
- 깃발:      ConeGeometry + flat 천            · flag_ally/enemy 재질 (리더 표시)
- 전체 크기: ~0.65 고정 (휴먼 스케일 1.0 대비)
```

아군/적군 구분: 재질 `armor` vs `armorEnemy` + 망토 색상.

---

## 6. 건물 규격 (NO 마리오)

**금지**:
- 2D 스프라이트
- 16×16 픽셀 아트 스케일업
- 체스판 체크무늬 바닥

**표준 건물** (fullloop-3d + squad-3d 확장):
```
- 울타리 기둥:   Cylinder(r=0.06, h=0.4, seg=8)  · wood
- 초가 오두막:   Box(본체) + Cone(지붕, seg=12)   · wood + leather
- 돌탑:          Box 3단 적재, 줄어드는 스케일    · stone
- 고인돌:        Box 2개 다리 + Box 1개 덮개      · stone
- 상점:          오두막 + 입구 차양               · 식별 깃발
- 모닥불:        Cone + PointLight(주황, 0.8)    · 애니메이션 깜빡임
- 신단수:        Cylinder(줄기) + 여러 Sphere    · wood + 진한 초록 잎
```

---

## 7. QA 체크리스트 (머지 전 필수)

각 PR/빌드마다 아래 전부 체크. 하나라도 실패 → 머지 거부.

- [ ] `THREE.WebGLRenderer` 사용 (2D Canvas 아님)
- [ ] `toneMapping: ACESFilmicToneMapping`
- [ ] AmbientLight intensity ≥ 0.45
- [ ] `MeshStandardMaterial` 사용 (Basic/Lambert 금지)
- [ ] 캐릭터 머리 세그먼트 ≥ 12
- [ ] 타일 높이 ≥ 0.2
- [ ] 마을 건물 3D 모델 (스프라이트/픽셀아트 0)
- [ ] 폰트 `Noto Serif KR` (Segoe UI 금지)
- [ ] 색상 팔레트 외 원색 미사용
- [ ] FPS ≥ 60 (데스크탑), ≥ 30 (모바일)
- [ ] 폴리곤 예산 ≤ 50k (MVP 씬)

---

## 8. 비교 스크린샷 가이드

품질팀 검증 시 아래 3장 필수:

1. **전투 와이드샷**: 아군 분대 + 적 분대 + 지형 (조명 확인)
2. **캐릭터 클로즈업**: 머리/투구/갑옷 (세그먼트 확인)
3. **마을 전경**: 건물 3개 + 캐릭터 (비-마리오 확인)

각 스크린샷 옆에 FPS·폴리곤 카운터 오버레이 표시.
