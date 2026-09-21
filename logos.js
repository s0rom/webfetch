const OS_LOGOS = {
  linux: `
            $7#####
           $7#######
           $7##$8O$7#$8O$7##
           $7#$3#####$7#
         $7##$8##$3###$8##$7##
        $7#$8###########$7#
        $7#$8###########$7#
        $7#$8###########$7#
      $3##$7#$8###########$7##$3##
    $3######$7#$8#######$7#$3######
    $3#######$7#$8#####$7#$3#######
      $3#####$7#######$3#####  
`,

  arch: `
                    $7-\`
                   .o+\`
                  \`ooo/
                 \`+oooo:
                \`+oooooo:
                -+oooooo+:
              \`/:-:++oooo+:
             \`/++++/+++++++:
            \`/++++++++++++++:
           \`/+++o$6oooooooo$7oooo/\`
          ./$5ooosssso++osssssso$5+\`
         .oossssso-\`\`\`\`/ossssss+\`
         -osssssso.      :ssssssso.
        :osssssss/        ossso+++.
       /ossssssss/        +ssssooo/-
     \`/ossssso+/:-        -:/+osssso+-
     \`+sso+:-\`                \`.-/+oso:
    \`++:.                      \`-/+/
    .\`                        \`/
`,

  ubuntu: `
                            $2....
                  $4.',:clooo:  $2.:looooo:.
               $4.;looooooooc  $2.oooooooooo'
            $4.;looooool:,''.  $2:ooooooooooc
           $4;looool;.         $2'oooooooooo,
          $4;clool'            $2.cooooooc.  $4,,
             $4...                $2......  $4.:oo,
     $2.;clol:,.                         $4.loooo'
    $2:ooooooooo,                         $4'ooool
   $2'ooooooooooo.                         $4loooo.
   $2'ooooooooool                          $4coooo.
    $2,loooooooc.                         $4.loooo.
       $2.,;;;'.                          $4;ooooc
            $4...                         $4,ooool.
         $4.cooooc.               $2..',,'.  $4.cooo.
           $4;ooooo:.            $2;oooooooc.  $4:l.
            $4.coooooc,..      $2coooooooooo.
               $4.:ooooooolc:. $2.ooooooooooo'
                 $4.':loooooo;  $2,oooooooooc
                    $4..';::c'  $2.;loooo:'
`,

  debian: `
            $6_,met$$$$$$$$$$gg.
         ,g$$$$$$$$$$$$$$$$$$$$P.
       ,g$$$$P""         """Y$$$$.".
      ,$$$$P'               \`$$$$$$.
    ',\`$$$$P        ,ggs.     \`$$$$b:
    \`d$$$$'      ,$P"'   $2.$6    $$$$$$
     $$$$P      d$'     $2,$6     $$$$P
     $$$$:      $$$.   $2-$6    ,d$$$$'
     $$$$;      Y$b._    _,d$P'
     Y$$$$.    $2\`.$6\`"Y$$$$$$$$P"'
     \`$$$$b      $2"-.__
      $6\`Y$$$$b
       \`Y$$$$.
         \`$$$$b.
           \`Y$$$$b.
              \`"Y$$b._
                 \`""""
`,

  fedora: `
                 .,;::::;,'.
             .';:cccccccccccc:;,.
          .;cccccccccccccccccccccc;.
        .:cccccccccccccccccccccccccc:.
     .;ccccccccccccc;$5.:dddl:.$8;ccccccc;.
     .:ccccccccccccc;$5OWMKOOXMWd$8;ccccccc:.
    .:ccccccccccccc;$5KMMc$8;cc;$5xMMc$8;ccccccc:.
    ,cccccccccccccc;$5MMM.$8;cc;$5;WW:$8;cccccccc,
    :cccccccccccccc;$5MMM.$8;cccccccccccccccc:
    :ccccccc;$5oxOOOo$8;$5MMM000k.$8;cccccccccccc:
    cccccc;$50MMKxdd:$8;$5MMMkddc.$8;cccccccccccc;
    ccccc;$5XMO'$8;cccc;$5MMM.$8;cccccccccccccccc'
    ccccc;$5MMo$8;ccccc;$5MMW.$8;ccccccccccccccc;
    ccccc;$50MNc.$8ccc$5.xMMd$8;ccccccccccccccc;
    cccccc;$5dNMWXXXWM0:$8;cccccccccccccc:,
    cccccccc;$5.:odl:.$8;cccccccccccccc:,.
    ccccccccccccccccccccccccccccc:'.
    :ccccccccccccccccccccccc:;,..
     ':cccccccccccccccc::;,.
`,

  mint: `
                $3_.-ppOOOOOOqq-._
             .oOOOOPPPPPPPPPPOOOOo.
          .oOOOO$3.=oOOOOOOOOOOo=.$8OOOOo.
        .:OOO$3.=oOOOOOOOOOOOOOOOOo=.$8OOO:.
        .OOO$3.OOOOOOOOOOOOOOOOOOOOOOOO.$8OOO.
       .OOO$3.OO     OOO:´    \`::´    \`:OOO.$8OO:
      .OOO$3.OOO     OO          O     OOO.$8OOO:
      OOO$3.OOOO     OO    oo    oo    OOOO.$8OOO
     :OOO$3:OOOO     OO    OO    OO    OOOO:$8OOO:
     :OOO$3:OOOO     OO    OO    OO    OOOO:$8OOO:
     'OOO$3'OOOO     OO    OO    OO    OOOO'$8OOO'
      OOO$3'OOOO     OO____OO____OO    OOOO'$8OOO'
      'OOO$3'OOO     'OOOOOOOOOOOO'    OOOO'$8OOO
       'OOO$3'OOO                     .OOO'$8OOO'
        'OOO$3'OOOO:ooooooooooooooo:OOOO'$8OOO'
         ':OOOo$3'=OOOOOOOOOOOOOOOOO='$8oOOO:'
           ':OOOOo$3'=OOOOOOOOOOO='$8oOOOO:'
              \`\`-OOOOooooooooooOOOO-´´
                 \`\`\`-=:OOOO:=-´´´
`,

  nixos: `
         $1_      $2___    _      
        $1+o\   $2\  \  / \     
        $1\oo\   $2\  \/  /     
      $1,oo+oo+ooo$2\   ,/ $1+\   
     $1<ooooooooooo$2\  \ $1/os;  
         $2/''/     \  ,$1oo/   
    $2,───'  /       \,$1oooooo,
    $2\__   ;$1s       /oo/sss>'
      $2/  /$1so\$2_____$1/ss/$2____  
     $2', / $1\oo\    $2'''     / 
      \/ $1/sooo\$2───.  .───'  
        $1/so/\oo\   $2\  \     
        $1\o/  \s+\   $2\__\    
              $1'''      
  `,

  windows: `
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////
    $2/////////////////  $3/////////////////

    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////
    $5/////////////////  $4/////////////////  
  `,

  macos: `
                     ..'
                 ,xNMM.
               .OMMMMo
               lMM"
         .;loddo:.  .olloddol;.
       cKMMMMMMMMMMNWMMMMMMMMMM0:
     $2.KMMMMMMMMMMMMMMMMMMMMMMMWd.
     XMMMMMMMMMMMMMMMMMMMMMMMX.
    $3;MMMMMMMMMMMMMMMMMMMMMMMM:
    :MMMMMMMMMMMMMMMMMMMMMMMM:
    $4.MMMMMMMMMMMMMMMMMMMMMMMMX.
     kMMMMMMMMMMMMMMMMMMMMMMMMWd.
     $5'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
     'XMMMMMMMMMMMMMMMMMMMMMMMMK.
        $6kMMMMMMMMMMMMMMMMMMMMMMd
         ;KMMMMMMMWXXWMMMMMMMk.
            "cooc*"    "*coo'"  
`,

  android: `
             -o         o-
             +hydNNNNdyh+
           +m$3MMMMMMMMMMMMm+
         \`dMM$3m:$8NMMMMMMN$3:m$3MMd\`
         h$3MMMMMMMMMMMMMMMMMMh
     ..  yyyyyyyyyyyyyyyyyyyy  ..
   .m$3MMm\`$3MMMMMMMMMMMMMMMMMMMM\`$3mMMm.
   :$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM:
   :$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM:
   :$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM:
   :$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM:
   -$3MMMM-$3MMMMMMMMMMMMMMMMMMMM-$3MMMM-
    +yy+ $3MMMMMMMMMMMMMMMMMMM +yy+
         $3m$3MMMMMMMMMMMMMMMMMMm
         \`/++$3MMMMh++h$3MMMM++/\`
             $3MMMMo  o$3MMMM
             $3MMMMo  o$3MMMM
             oNMm-  -mMNs
`,

  ios: `
                     ..'
                 ,xNMM.
               .OMMMMo
               lMM"
         .;loddo:.  .olloddol;.
       cKMMMMMMMMMMNWMMMMMMMMMM0:
     $2.KMMMMMMMMMMMMMMMMMMMMMMMWd.
     XMMMMMMMMMMMMMMMMMMMMMMMX.
    $3;MMMMMMMMMMMMMMMMMMMMMMMM:
    :MMMMMMMMMMMMMMMMMMMMMMMM:
    $4.MMMMMMMMMMMMMMMMMMMMMMMMX.
     kMMMMMMMMMMMMMMMMMMMMMMMMWd.
     $5'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
     'XMMMMMMMMMMMMMMMMMMMMMMMMK.
        $6kMMMMMMMMMMMMMMMMMMMMMMd
         ;KMMMMMMMWXXWMMMMMMMk.
            "cooc*"    "*coo'"  
`
};

function getLogoForOS(osName) {
  if (!osName) return OS_LOGOS.linux;

  const str = osName.toLowerCase();

  if (str.includes("arch")) return OS_LOGOS.arch;
  if (str.includes("ubuntu")) return OS_LOGOS.ubuntu;
  if (str.includes("debian")) return OS_LOGOS.debian;
  if (str.includes("fedora")) return OS_LOGOS.fedora;
  if (str.includes("mint")) return OS_LOGOS.mint;
  if (str.includes("nix")) return OS_LOGOS.nixos;
  if (str.includes("win")) return OS_LOGOS.windows;
  if (str.includes("mac") || str.includes("darwin")) return OS_LOGOS.macos;
  if (str.includes("android")) return OS_LOGOS.android;
  if (str.includes("ios") || str.includes("iphone") || str.includes("ipad")) return OS_LOGOS.ios;
  if (str.includes("linux")) return OS_LOGOS.linux;

  if (OS_LOGOS[str]) return OS_LOGOS[str];

  return OS_LOGOS.linux;
}
