@echo off
echo Copying remaining components to Integrated App...

REM Copy Module3 components
xcopy /Y "Module3_PreparationGuidance\frontend\src\components\ResourceForm.js" "IntegratedApp\frontend\src\pages\Preparation\"
xcopy /Y "Module3_PreparationGuidance\frontend\src\components\ChecklistList.js" "IntegratedApp\frontend\src\pages\Preparation\"
xcopy /Y "Module3_PreparationGuidance\frontend\src\components\ChecklistForm.js" "IntegratedApp\frontend\src\pages\Preparation\"
xcopy /Y "Module3_PreparationGuidance\frontend\src\components\ChecklistDetail.js" "IntegratedApp\frontend\src\pages\Preparation\"

REM Copy Module4 components
xcopy /Y "Module4_SkillGapAnalysis\frontend\src\components\AssessmentList.js" "IntegratedApp\frontend\src\pages\SkillGap\"
xcopy /Y "Module4_SkillGapAnalysis\frontend\src\components\AssessmentForm.js" "IntegratedApp\frontend\src\pages\SkillGap\"
xcopy /Y "Module4_SkillGapAnalysis\frontend\src\components\AssessmentDetail.js" "IntegratedApp\frontend\src\pages\SkillGap\"

echo Done! Now updating import paths...
pause
