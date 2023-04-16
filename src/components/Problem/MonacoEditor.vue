<template>
    <div class="wrapper">
        <br>
        <el-row>
            <el-col :offset="2" :span="10">
                语言：
                <el-select v-model="language" placeholder="选择语言" @change="handleLanguage">
                    <el-option
                        v-for="item in languageOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :offset="2" :span="10">
                主题：
                <el-select v-model="editorTheme" placeholder="设置主题" @change="handleTheme">
                    <el-option label="Visual Studio Dark" value="vs-dark"></el-option>
                    <el-option label="Visual Studio" value="vs"></el-option>
                    <el-option label="High Contrast Dark" value="hc-black"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24"><div id="codeEdit"></div></el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref,onMounted,toRaw } from 'vue'
import * as monaco from 'monaco-editor'

const editor = ref(null)
const language = ref('cpp')
const editorTheme = ref("vs")
const fontSize = ref(15)

const languageOptions = [
    {
        value:'c',
        label:'C'
    },
    {
        value:'cpp',
        label:'C++'
    },
    {
        value:'go',
        label:'Go'
    },
    {
        value:'java',
        label:'Java'
    },
    {
        value:'python2',
        label:'Python2'
    },
    {
        value:'python3',
        label:'Python3'
    },
    {
        value:'javascript',
        label:'JavaScript'
    }
]
// 初始化代码编辑器
function initEditor(){
    editor.value = monaco.editor.create(document.getElementById('codeEdit'), {
        value: '',                  // 代码
        language: language.value,   // 语言
        theme: editorTheme.value,   // 主题
        selectOnLineNumbers: true,  //显示行号
        foldingStrategy: 'indentation', // 代码可分小段折叠
        tabSize: 4,                 // tab 缩进长度
        roundedSelection: false,
        readOnly: false,            // 只读
        cursorStyle: 'line',        //光标样式
        automaticLayout: true,      //自动布局
        glyphMargin: true,          //字形边缘
        useTabStops: false,
        fontSize: fontSize.value,   //字体大小
        autoIndent: true,           //自动布局
        quickSuggestionsDelay: 100, //代码提示延时
    });
}
// 更换主题
const handleTheme = () => {
    monaco.editor.setTheme(editorTheme.value)
}
// 更换语言
const handleLanguage = (item) => {
    language.value = item
    monaco.editor.setModelLanguage(toRaw(editor.value).getModel(), language.value)
}

function GetCode()
{
    return toRaw(editor.value).getValue()
}

function GetLanguage()
{
    if(language.value == "c"){
        return "C"
    }else if(language.value == "cpp"){
        return "C++"
    }else if(language.value == "go"){
        return "Go"
    }else if(language.value == 'java'){
        return "Java"
    }else if(language.value == 'python2'){
        return "Python2"
    }else if(language.value == 'python3'){
        return "Python3"
    }else if(language.value == 'javascript'){
        return "JavaScript"
    }
}
onMounted(()=>{
    initEditor()
})
defineExpose({
    GetLanguage,
    GetCode
})
</script>
<style scoped>
#codeEdit{
    width:1200px;
    height: 450px;
}
.wrapper{
    width: 1200px;
    height: 550px;
}
</style>