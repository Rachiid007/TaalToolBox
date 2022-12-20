<script setup lang="ts">
import FooterVue from '@/components/footer/Footer.vue';

</script>

<template>
    <div class="body">
        <div class="main">
        <div class="header">
            <div class = "item1"> TaalToolBox: </div>
            <div class="item2"> Mesures RGPD et traitement de données </div>
        </div>

        <div class="container">
            <h1 class="title1"> Politique de confidentialité du site TaalToolBox</h1>
            <h1>I / L’objectif de la politique de confidentialité</h1>
            <p>  Cette politique de confidentialité est établie dans le but d’informer les utilisateurs du site TaalToolBox, des modalités suivantes :</p>
            <ul>
                <li>-	Les données personnelles recueillies par le site internet </li>
                <li>-  L’utilisation faite de ces données</li>
                <li>-  L’accès à ces données</li>
                <li>-  Les droits que possèdent les utilisateurs du site</li>
                <li>-  La politique liée à l’utilisation de cookies</li>
            </ul>
            <p>
                Cette politique de confidentialité fonctionne parallèlement aux conditions générales du site TaalToolBox.be
            </p>
            <h1>
                II / Lois applicables
            </h1>
            <p>
                Conformément au Règlement Général sur la Protection des Données, cette politique de confidentialité est sujette aux règlements suivants :
            </p>
            <p>
                Les données personnelles sont :
            </p>
           <ul>
            <li>- traitées de manière licite et transparente </li>
            <li>-	collectées à des fins déterminées, explicites et légitimes, et ne seront pas traitées ultérieurement d’une manière incompatible avec ces fins. Conformément à l’article 89, paragraphe 1 du RGPD, le stockage et le traitement de ces données à des fins archivistiques dans l’intérêt public, à des fins de recherche scientifique ou historique ou à des fins statistiques, n’est pas considéré comme incompatible avec les finalités initiales ;</li>
            <li>-	adéquates, pertinentes et limitées à ce qui est nécessaire dans le cadre des finalités pour lesquelles elles sont traitées ;</li>
            <li>-	exactes, et si nécessaires tenues à jour. Toutes les mesures raisonnables seront prises pour corriger des données incorrectes au regard de la finalité pour laquelle celles-si sont collectées ;</li>
            <li>-	conservées sous une forme permettant l’identification des personnes concernées pour une durée suffisante pour leur traitement ;</li>
            <li>-	traitées d’une façon qui garantit la sécurité de celles-ci, y compris en ce qui concerne le traitement non-autorisé ou illicite, la perte ou la destruction de ces données, accidentelle ou volontaire.</li>
           </ul>

           <h1>III / Consentement</h1>
           <p>En utilisant le site TaalToolBox.be, les utilisateurs consentent à </p>
           <ul>
            <li>-	Toutes les conditions incluses dans la présente politique de confidentialité ;</li>
            <li>-	La collecte, l’utilisation et la conservation des données listées dans la présente politique de confidentialité.</li>
           </ul>

           <h1>IV / Données personnelles collectées</h1>

           <p>
                Les données personnelles suivantes collectées et utilisées sur le site TaalToolBox.be sont : l'addresse email, la date de naissance, le sexe, le nom et le prenom.
                Aucune donnée supplémentaire n’est collectée sans vous en informer au préalable.

 

            </p>
            <h1>V / Traitement de ces données</h1>

            <p>Les données personnelles recueillies sur le site TaalToolBox.be ne sont collectées et traitées que dans le cadre des fins précisées dans la présente politique de confidentialité et / ou dans les pages pertinentes du site. Les données personnelles que nous collectons ne seront pas utilisées à d’autres fins.</p>
            <h1>VI /Stockage et protection des données personnelles</h1>
            <P> Le site TaalToolBox.be ne conserve pas les données personnelles plus longtemps que ce qui est nécessaire à la réalisation des fins pour lesquelles elles sont collectées.</P>
            <P> Afin de proteger ces données, Nous avons mis en place une serie d'action à commencer par le sallage et le hachage des mots de passes, la non disponibilité de la base de données sur internet etc..</P>

            <h1>VII / Droits de l’utilisateur</h1>
            <p>Conformément au chapitre 3, art 12-23 du RGPD, les utilisateurs du site [site internet] ont, en ce qui concerne leurs données personnelles, les droits suivants :</p>
            <ul>
                <li>-	Droit d’accès</li>
                <li>-	Droit de rectification</li>
                <li>-	Droit à l’effacement</li>
                <li>-	Droit d’objection</li>
                <li>-	Droit de restreindre le traitement</li>
                <li>-	Droit de restreindre le traitement</li>
                
            </ul>
            <p>Pour faire valoir l’un de ses droits, accéder à vos données, les modifier ou les supprimer d’une quelconque manière, vous pouvez communiquer nous contacter via les addresses email suivantes:</p>

            <h1>IX / Modification de la politique de confidentialité</h1>

            <p>Afin de rester en accord avec la loi ou de refléter tout changement dans notre processus de gestion des données personnelles, la présente politique de confidentialité peut être amenée à changer et à être modifiée régulièrement. Il est recommandé aux utilisateurs de vérifier régulièrement cette politique afin de se tenir informés de notre politique en termes de collecte et de traitement de données personnelles.</p>
        </div>
        
    </div>
    

    <div class ="footer">
        <FooterVue/>
    </div>

    </div>
    
    

    
   

</template>



<style scoped>

.body{
    padding:2%;
    position: relative;
    margin: 0;

}
.main{
    position: relative;
    padding-bottom: 6.74rem;
    margin: 0 auto;
    justify-items: center;
    justify-content: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 1380px - 58.8px);
}
.header{
    width: 100%;
    max-width: 1500px;
    border-bottom: 1px solid grey;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: NotoSans-Regular;
    background-color: white;
    margin: 0 auto;
    top: 0;

}

.title1{
    color: #026b30;
    font-size: 25px;

}

.item1{
    font-weight: bold;
    color: #026b30;
    font-size: 30px;
}

.item2{
    font-weight: bold;
    color: grey;
    font-size: 20px;
    
}

.container{
    display: flex;
    flex-direction: column;
    font-size: 20px;
    row-gap: 30px;
    font-style: normal;
    top: 100px;
    color: black;
    justify-content: center;
    padding: 30px;
   
}

h1{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-decoration: underline;
}
.footer{
    /*position: absolute;*/
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
     position: absolute;
  z-index: 1; 
    
    
}
</style>