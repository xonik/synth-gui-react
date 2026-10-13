const names = [{
  32: 'sine',
  33: 'saw',
  34: 'square',
  45: 'pulse 1',
  46: 'pulse 2',
  56: '3rd/5th harm',
  58: '7th harm',
  60: '14th/28th harm',
  75: 'voc 1',
  76: 'voc 2',
  113: 'bell partial 1',
  115: '3rd/5ths saw harm',
  116: 'oct/5th sine',
  117: '2oct sine',
  118: '4oct sine',
  119: 'oct/5th saw',
  120: '2oct saw',
  121: '5th square',
  122: 'oct/5th square',
  123: '2oct square',
  125: 'bell partial 2',
  126: 'null',
}]

/*
Evolver Waveshapes:

1. Sine
2. Sawtooth
3. Square
4. WmBell
5. RdBell
6. R2Bell
7. W2Bell
8. FmtBell
9. FzReed
10. FmtAOh
11. FmtAhh
12. TriPlus
13. DisBel
14. Pulse 1
15. Pulse 2
16. Square Reed
17. Oohh
18. Eehh
19. FeedBack
20. Piano1
21. Electric Piano
22. M.Harm
23. HiTop
24. WmReed
25. 3rd and 5th harmonics; fundamental absent
26. Hollow
27. Heavy 7th harmonics
28. BelOrg
29. BASSBELL (14th and 28th harmonics)
30. Tine1
31. PhSQR
32. Orient
33. HiPipe
34. Mass
35. ReedOrg
36. OrgAhh
37. MelOrg
38. FmtOrg
39. Clarinet
40. AhhFem
41. AhhHom
42. AhhBass
43. RegVox
44. VOCAL 1 (Detune oscs using either wave to bring out the vocal)
45. VOCAL 2 (Detune oscs using either wave to bring out the vocal)
46. HiAhh
47. Bass
48. Guitar
49. Nice
50. WoodWind
51. Oboe
52. Harp
53. Pipe
54. Hack1
55. Hack2
56. Hack3
57. Pinch
58. BellHrm
59. BellVox
60. Hi Harm
61. Hi Reed
62. BellReed
63. WmWhstl
64. Wood
65. Pure
66. Med Pure
67. HiHarm
68. FullBell
69. Bell
70. Pinch
71. Clustr
72. M.Pinch
73. VoxPnch
74. OrgPnch
75. AhhPnch
76. PnoOrg
77. BrReed
78. NoFund
79. ReedHrm
80. LiteFund
81. MelOrg
82. Bell Partials 1
83. Bell
84. Sawtooth 3rd and 5th
85. Sine 5ths (2 sines an octave and a 5th apart)
86. Sine 2 Octave (2 sines, 2 octaves apart)
87. Sine 4 Octave (2 sines, 4 Octaves apart)
88. Sawtooth 5ths (2 saws, an octave and a 5th apart)
89. Sawtooth 2 Octaves (2 saws, 2 octaves apart)
90. Square 5ths (2 squares, a 5th apart)
91. Square Octave+5th (2 squares, an octave and a 5th apart)
92. Square 2-Octaves (2 squares, 2 octaves apart)
94. Bell Partials 2
95. Null (Blank) Wave
96. ?
97-128. User Waves (same as 1-32 above)

Prophet VS Waveshapes:

1-31. User Waves
32. Sine
33. Saw
34. Sqr
35. WmBell
36. RdBell
37. R2Bell
38. W2Bell
39. FmtBell
40. FzReed
41. FmtAOh
42. FmtAhh
43. TriPlus
44. DisBel
45. Pulse1
46. Pulse2
47. SqrReed
48. Oohh
49. Eehh
50. FeedBack
51. Piano1
52. E.Pno
53. M.Harm
54. HiTop
55. WmReed
56. 3 & 5
57. Hollow
58. Hvy7
59. BelOrg
60. BassBel
61. Tine1
62. PhSQR
63. Orient
64. HiPipe
65. Mass
66. ReedOrg
67. OrgAhh
68. MelOrg
69. FmtOrg
70. Clar
71. AhhFem
72. AhhHom
73. AhhBass
74. RegVox
75. Vocal
76. Homme
77. HiAhh
78. Bass
79. Guitar
80. Nice
81. WWind
82. Oboe
83. Harp
84. Pipe
85. Hack1
86. Hack2
87. Hack3
88. Pinch
89. BellHrm
90. BellVox
91. Hi Harm
92. Hi Reed
93. BellReed
94. WmWhstl
95. Wood
96. Pure
97. Med Pure
98. HiHarm
99. FullBell
100. Bell
101. Pinch
102. Clustr
103. M.Pinch
104. VoxPnch
105. OrgPnch
106. AhhPnch
107. PnoOrg
108. BrReed
109. NoFund
110. ReedHrm
111. LiteFund
112. MelOrg
113. Bell
114. Bell
115. 3&5Saw
116. 5thSin
117. Sin2Oct
118. Sin4Oct
119. Saw5th
120. Saw2Oct
121. Sqr5th
122. Sqr5Oct
123. Sqr2Oct
124. WarmLo
125. Bells
126. *null*
127. Noise

 */